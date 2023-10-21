# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## PRUEBA
API: https://randomuser.me

- [] Fetch 100 registros de la API
- [] Mostrar datos en formato tabla
- [] Añadir modo de colores alternos para los registros de la tabla
- [] Permitir ordenar los registros en función del país
- [] Permitir borrado de registros de la tabla
- [] Feature para poder restaurar el estado inicial de la tabla, recuperando los registros eliminados
- [] Manejar posibles errores
- [] Feature para poder filtrar los registros por país
- [] Evitar reordenar los registros al filtrar por país
- [] Ordenar registros al hacer click en la cabecera de la columna


## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
