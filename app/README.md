# Google Maps Platform with React + TypeScript + Vite

This template provides a minimal setup to show a Google map powered by the Google Maps JavaScript API in a React app written in TypeScript and runnning in Vite with HMR and some ESLint rules.

## Google Maps Platform

[Google Maps Platform](https://developers.google.com/maps) provides APIs and SDKs for bringing maps and location-based data into web and mobile apps. The [Maps JavaScript API](https://developers.google.com/maps/documentation/javascript) lets you customize maps with your own content and imagery for display on web pages and mobile devices. The Maps JavaScript API features four basic map types (roadmap, satellite, hybrid, and terrain) which you can modify using layers and styles, controls and events, and various services and libraries.

[@vis.gl/react-google-maps](https://goo.gle/react-google-maps), is a Google-sponsored library for integrating Maps JavaScript API components in a React web app. The package contains React components that correspond to elements in the Maps JavaScript API and hooks to access the map instance and additional libraries, speeding up load times and making the overall codebase easier to manage.

## Vite and React plugins

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
