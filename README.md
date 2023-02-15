# React
## Initialize NPM
 `npm init -y`

## Prettier
prettier - tool that auto formats code
- `npm i -D prettier`
- specific version: `npm i -D prettier@2.7.1`
- create `.prettierrc`  put rules under bracket {}
- turn on format on save: *cmd ,* and type *format on save*
- Add script to package json so prettier works regardless of language: `"format": "prettier --write \"src/**/*.{js,jsx,ts,tsx}\"",`
- npm run format

## ESLint
ESLint - catch very simple JS problems
- `npm install -D eslint@8.24.0 eslint-config-prettier@8.5.0` to install eslint in your project development dependencies.
- create `.eslintrc.json`

```json
{
    "extends": [
        "eslint:recommended",
        "prettier"
    ],
    "plugins": [],
    "parserOptions": {
        "ecmaVersion": 2022,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "env": {
        "es6": true,
        "browser": true,
        "node": true
    }
}
```

- update package json
```json
  "scripts": {
    "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx}\"",
    "lint": "eslint \"src/**/*.{js,jsx}\" --quiet",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
  ```
  
## Gitignore
`.gitignore`
```.gitignore
node_modules
.parcel-cache/
dist/
.env
.DS_Store
coverage/
.vscode/
```

## Vite
This is your build tool. Pronounced *veet*
- `npm install -D vite@3.1.4 @vitejs/plugin-react@2.1.0`
- change `.index.html` 
```html
<body>
	<div id="root">not rendered</div>
	<script type="module" src="./App.jsx"></script>
</body>
```
- create `vite.config.js`
```javascript
import { defineConfig } from "vite";
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    root: "src",
})
```
- Update package.json
``` json
"scripts": {
"dev": "vite",
"build": "vite build",
"preview": "vite preview",
}
```

## Install React 
Install React to our project: `npm install react@18.2.0 react-dom@18.2.0`

## Start React Project
- `npm i`
- `npm run dev ` -  uses vite to run app

package.json should look like this:
```json
{
  "name": "citr-v8-project",
  "version": "8.0.0",
  "description": "Complete Intro to React v8 project",
  "main": "index.js",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "format": "prettier --write \"src/**/*.{js,jsx}\"",
    "lint": "eslint \"src/**/*.{js,jsx}\" --quiet"
  },
  "keywords": [],
  "author": "Brian Holt",
  "license": "ISC",
  "devDependencies": {
    "@vitejs/plugin-react": "2.1.0",
    "eslint": "8.24.0",
    "eslint-config-prettier": "8.5.0",
    "prettier": "2.7.1",
    "vite": "3.1.4"
  },
  "dependencies": {
    "react": "18.2.0",
    "react-dom": "18.2.0"
  }
}
```

## ESLint + React
We need to augment ESLint to understand `JSX`
- `npm install -D eslint-plugin-import@2.26.0 eslint-plugin-jsx-a11y@6.6.1 eslint-plugin-react@7.31.8`

Update: `eslintrc.json`
```json
{
  "extends": [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier"
  ],
  "rules": {
    "react/prop-types": 0,
    "react/react-in-jsx-scope": 0
  },
  "plugins": ["react", "import", "jsx-a11y"],
  "parserOptions": {
    "ecmaVersion": 2022,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6": true,
    "browser": true,
    "node": true
  },
  "settings": {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx"]
      }
    }
  }
}
```

- Another ESLint rule
	- `npm install -D eslint-plugin-react-hooks@4.6.0` 
	- makes sure you use hooks in a good way
```json
{ "extends": [ … "plugin:react-hooks/recommended", … ] }
```

## Production
React already has a lot of developer conveniences built into it out of the box. What's better is that they automatically strip it out when you compile your code for production.

So how do you get the debugging conveniences then? Well, if you're using Vite.js, it will compile your development server with an environment variable of `NODE_ENV=development` and then when you run `vite build` it will automatically change that to `NODE_ENV=production` which is how all the extra weight gets stripped out.

### Strict Mode
React has a new strict mode. If you wrap your app in `<React.StrictMode></React.StrictMode>` it will give you additional warnings about things you shouldn't be doing.

## React Dev Tools
- https://reactjs.org/docs/optimizing-performance.html#profiling-components-with-the-devtools-profiler

## React Router
`npm install react-router-dom@6.4.1`
```jsx
//app.jsx
  return (
    <BrowserRouter>
      <h1>Adopt Me!</h1>
      <Routes>
        <Route path="/" element={<SearchParams />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
```

Using `Link` over `<a<a>`
- anchor should only be to an external link outside of the APP
- If linking to a different URL within the APP use `<Link>`
	- This will not refresh the page (re-rendering every component, which is great for application performance)
	- https://markadamfoster.com/react-anchor-tags-vs-link-components/
```js
	// a normal-looking, HTML-style a tag:
	<a href="https://www.example.com">Click Here!</a>

	// some kind of Link component, provided by React/Reach Router, Gatsby, etc
	<Link to="/example">Click Here!</Link>
```

## React Query
Too many useEffect can lead to slow application performance and bugs. Try to use libraries that do this for you.
- https://tanstack.com/query/v4
- `npm install @tanstack/react-query@4.10.1`

>`@tanstack/react-query` is the same people who do `react-query`. This is just the newer version. They now support than just React.

```jsx
import { QueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query";

// instantiate client
const QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // once you fetch don't refetch for user's session
      cacheTime: Infinity,
    },
  },
})

// Wrap around component
<BrowserRouter>
  <QueryClientProvider client={queryClient}>
	<header>
	  <Link to="/">Adopt Me!</Link>
	</header>
	<Routes>
	  <Route path="/" element={<SearchParams />} />
	  <Route path="/details/:id" element={<Details />} />
	</Routes>
  </QueryClientProvider>
</BrowserRouter>

// Create a coustom method
```

## Uncontrolled Forms
We're now doing an uncontrolled form with React (which unless you have specific validation needs or dependencies like we do with animal, I suggest you always do). We don't have to have verbose two-way data binding code to control the form, we can just wait until a users submits, gather the data, and ship it off to the API
- Uncontrolled forms can be used for independent states or variables 

## ErrorBoundary
Catch of react 

## Rendering up
- Portals lets you render from a different place from within a component without prop drilling
- *useRef* lets you need the static value

## Global states
- example would be user logged in -> app level state

*React Context* lets us create global states
- use this sparing 

## React Lifecycle:

<img width="856" alt="image" src="https://user-images.githubusercontent.com/32419781/218898909-3b8c4cd1-105d-4936-864d-cb560ee1af25.png">
<img width="552" alt="image" src="https://user-images.githubusercontent.com/32419781/218900837-f98dd3f5-1cc6-4bdd-96f7-4311788ff913.png">

