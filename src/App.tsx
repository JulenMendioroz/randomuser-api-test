import { useCallback, useEffect, useMemo, useRef, useState } from "react"

const API_URL = "https://randomuser.me/api?results=100"

type UserId = `${string}-${string}-${string}-${string}-${string}`

type User = {
  id: UserId
  firstname: string
  lastname: string
  country: string
  photo: string
}

type NewUser = Omit<User, "id">

function createUser({ firstname, lastname, country, photo }: NewUser): User {
  return {
    id: crypto.randomUUID(),
    firstname,
    lastname,
    country,
    photo,
  }
}

async function getUsers(): Promise<User[]> {
  try {
    const res = await fetch(API_URL)

    if (!res.ok) {
      const error = await res.text()
      console.error(error)
      return []
    }

    const json = await res.json()

    return json.results.map(
      (result: {
        name: { first: string; last: string }
        location: { country: string }
        picture: { thumbnail: string }
      }) =>
        createUser({
          firstname: result.name.first,
          lastname: result.name.last,
          country: result.location.country,
          photo: result.picture.thumbnail,
        })
    )
  } catch (error) {
    console.error(error)
    return []
  }
}

type Column = "country" | "firstname" | "lastname"
type SortConfig = {
  column: Column
  order: "asc" | "desc"
}

function sortUsers(users: User[], config?: SortConfig) {
  if (config === undefined) return users
  const { column, order } = config
  const usersCopy = [...users]

  const selectFn =
    column === "country"
      ? ({ country }: User) => country
      : column === "firstname"
      ? ({ firstname }: User) => firstname
      : column === "lastname"
      ? ({ lastname }: User) => lastname
      : null

  if (!selectFn) throw new Error(`Invalid column option: ${column}`)

  const compareFn =
    order === "asc"
      ? (a: User, b: User) => selectFn(a).localeCompare(selectFn(b))
      : (a: User, b: User) => selectFn(b).localeCompare(selectFn(a))

  return usersCopy.sort(compareFn)
}

function App() {
  const [users, setUsers] = useState<User[]>([])
  const usersBackupRef = useRef<User[]>([])

  const [isStriped, setIsStriped] = useState(false)
  const [sortConfig, setSortConfig] = useState<SortConfig>()
  const [filter, setFilter] = useState("")

  useEffect(() => {
    getUsers()
      .then((users) => {
        setUsers(users)
        usersBackupRef.current = users
      })
      .catch(console.error)
  }, [])

  const toggleStriped = useCallback(() => setIsStriped((prev) => !prev), [])

  const sortBy = useCallback(
    (column: Column) => () => {
      setSortConfig((prev) => {
        if (!prev || prev.column !== column) {
          return { column, order: "asc" }
        }
        const order = prev.order === "asc" ? "desc" : "asc"
        return { column, order }
      })
    },
    []
  )

  const deleteUser = useCallback(
    (id: UserId) => () => {
      setUsers((prev) => prev.filter((user) => user.id !== id))
    },
    []
  )

  const restoreUsers = useCallback(() => setUsers(usersBackupRef.current), [])

  const sortedUsers = useMemo(
    () => sortUsers(users, sortConfig),
    [users, sortConfig]
  )

  const filteredUsers = useMemo(() => {
    const _filter = filter.toLocaleLowerCase()
    return sortedUsers.filter((user) =>
      user.country.toLocaleLowerCase().includes(_filter)
    )
  }, [sortedUsers, filter])

  return (
    <main>
      <h1>Random user test</h1>
      <div className="btn-container">
        <button onClick={toggleStriped}>Striped</button>
        <button onClick={restoreUsers}>Restore users</button>
        <label>
          Search by country:{" "}
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Ireland"
            type="search"
          />
        </label>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Photo</th>
              <th>
                <button onClick={sortBy("firstname")}>First</button>
              </th>
              <th>
                <button onClick={sortBy("lastname")}>Last</button>
              </th>
              <th>
                <button onClick={sortBy("country")}>Country</button>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className={isStriped ? "striped" : ""}>
            {filteredUsers.map(
              ({ id, firstname, lastname, country, photo }) => (
                <tr key={id}>
                  <td>
                    <img src={photo} alt={"User profile"} />
                  </td>
                  <td>{firstname}</td>
                  <td>{lastname}</td>
                  <td>{country}</td>
                  <td>
                    <button onClick={deleteUser(id)}>Delete</button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default App
