# Course
https://react-v8.holt.courses/lessons/hooks-in-depth/useref

# Hooks
## useRef
- React containers are destroyed and created every render cycle 
- With `useRef` the original container survives every render cycle
	- Referring directly to an element in the dom

>It's worth noting that `useRef` is useful when you need to access a DOM element directly, or when you need to store a value that will persist between renders

### memo
`React.memo` tells React "as long as the parameters being passed into this component don't change, _do not re-render it ever_. You might be tempted to do this on every component but believe me, _don't_. Things will no re-render when you expect them to and you will forget you memoized them. Only use memo where you need to.

## useReducer
-  `useReducer` allows us to do Redux-style reducers but inside a hook.
- This is a preferable approach if you have complex state updates
- if you have a situation where state updates are very similar so it makes sense to contain all of them in one function.

## useMemo and UseCallback
`React.useMemo` is a Hook in React that allows you to optimize the performance of your application by only recalculating a value when one of its dependencies has changed.

`useMemo` takes two arguments: a function that calculates the value and an array of dependencies. The function will only be called and its result will be stored and returned when one or more of the dependencies have changed.

`useCallback` is a React hook that allows you to memoize a function. It is typically used when you have a child component that needs to be passed a callback function from its parent, and you want to avoid unnecessary re-renders of the child component when the parent re-renders.
- requires parent to be wrapped in `memo`

*In summary, useCallback is used to memoize a function, whereas useMemo is used to memoize a value*

## useLayoutEffect
`useLayoutEffect` is a React hook that allows you to synchronously run an effect after the browser has painted. This can be useful for scenarios where you need to measure the layout of elements or synchronize an animation with the browser's repaint. It's similar to `useEffect`, but it runs synchronously after the browser's layout and paint, rather than asynchronously like `useEffect`.

Examples of when you might use `useLayoutEffect` include:

-   Measuring the size or position of a DOM element
-   Synchronizing an animation with the browser's repaint
-   Updating a CSS animation or transition
-   Interacting with third-party libraries that require layout information

## useId
use case is when we went a unique ID per instantiation of the component
- cannot be used for CSS selector

# Tailwind
install tailwind, postcss, and autoprefixer `npm i -D tailwindcss@3.1.8 postcss@8.4.18 autoprefixer@10.4.12`
- Under the hood, Vite processes all your CSS with PostCSS with the autoprefixer plugin.

Start Tailwind project: `npx tailwindcss init -p`
- Creates postcss.config.js
- tailwind.config.js

Tailwind prettier plugin: `npm install -D prettier-plugin-tailwindcss`
```js
// create a (may have to replace rc file) prettier.config.js
module.exports = {
  plugins: [require('prettier-plugin-tailwindcss')],
}
```

# Code Splitting 
Only render parts of the page that the route has already been loaded (only render when user needs)
- Should only be done for expensive parts of the code base like 30 kb

# TypeScript
1.  First thing, `npm install -D typescript@4.8.4`.
2.  Then run `npx tsc --init`. `npx` will run the TypeScript tool directly from your node_modules and init your project for you. You'll see now a tsconfig.json. We don't need to set up anything else since Vite already knows how to handle TypeScript files.
3.  Open your new `tsconfig.json` file and uncomment the `jsx` field. This lets TypeScript that you're writing React.
4.  Then update the target to be `ES2022` so that you can use async / await and promises and all that.
5.  Uncomment the `"module"` line line and make it `"module": "ES2022"`.
6.  Uncomment the `"moduleResolution": "node"` line

You'll end up with something like this:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "jsx": "react-jsx",
    "module": "ES2022",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

## EsLint TypeScript
1.  Run `npm install -D eslint-import-resolver-typescript@3.5.1 @typescript-eslint/eslint-plugin@5.40.1 @typescript-eslint/parser@5.40.1`
2.  Change your package.json lint entry to `"lint": "eslint \"src/**/*.{js,jsx,ts,tsx}\" --quiet",`
3.  Add the following to .eslintrc.json

```json
// inside extends, above prettier rules
"plugin:@typescript-eslint/recommended",

// inside rules, generally a good rule but we're going to disable it for now
"@typescript-eslint/no-empty-function": 0

// inside plugins
"@typescript-eslint"

// replace parser
"parser": "@typescript-eslint/parser",

// add to parserOptions
"project": "./tsconfig.json",

// replace settings object
"settings": {
  "react": {
    "version": "detect"
  },
  "import/parsers": {
    "@typescript-eslint/parser": [".ts", ".tsx"]
  },
  "import/resolver": {
    "typescript": {
      "alwaysTryTypes": true
    }
  }
}
```

Now you're linting as well as type checking! This added a few new TypeScript-specific rules as well. [Check those out here.](https://typescript-eslint.io/rules/).

- `npm run lint`  - lint
- `npx tsc --noEmit`      - typescript checker
- `npm run typecheck`  

# Redux
1. Setup Redux Toolkit - create store.js

```js
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'

const store = configureStore({
  reducer: rootReducer,
})

export default store
```
3. Create a Slice
4. 

# Testing

## Testing with Vitest

[Vitest](https://vitest.dev/) is a test runner made by the fine folks who make Vite (as well as Vue.) The idea behind Vitest is that you already have a complete build pipeline for making an app, why should that pipeline be any different for test? It shouldn't; you want your testing environment to look as much like your app environment as possible.

We need to tell Vitest that we need a browser-like environment which it will fulfill via the [happy-dom](https://github.com/capricorn86/happy-dom) package. happy-dom is a lot like jsdom but smaller, doesn't do 100% of what the browser does, and is much, much faster.

- `npm install -D vitest@0.24.3 @testing-library/react@13.4.0 happy-dom@7.6.0`
	- install vitest
	- install happy dom
- Run with `npm t` or `npm run test` or `npm run t`

```json 
// add this to the vite.config.js
test: { 
	environment: "happy-dom", 
},
```

Try to test functionality, not implementation. Make your tests interact with components as a user would, not as a developer would. This means you're trying to do more think of things like "what would a user see" or "if a user clicks a button a modal comes up" rather than "make sure this state is correct" or "ensure this library is called". This isn't a rule; sometimes you need to test those things too for assurance the app is working correctly. Use your best judgment.

## Running Test
create directory `__tests__`
- assumes everything in directory is a testPet 
- create `filename.test.jsx`

### mock an api
	- `npm install -D vitest-fetch-mock@0.2.1`
	- 

```json
// inside "test" 
setupFiles: ["./setupVitest.js"],
```

Make a file `setupVitest.js` - this file runs before all tests runs
```js
import createFetchMock from "vitest-fetch-mock"; 
import { vi } from "vitest"; 
const fetchMock = createFetchMock(vi); 
fetchMock.enableMocks();
```

## Snapshot tests
Snapshot tests are low confidence, low cost ways of writing tests. With more-or-less a single line of code you can assert: this code doesn't break, and it isn't changing over time.

```jsx
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Results from "../Results";

test("renders correctly with no pets", () => {
  const { asFragment } = render(<Results pets={[]} />);
  expect(asFragment()).toMatchSnapshot();
});
```

## Test Coverage
Add the following command to your npm scripts: `"test:coverage": "vitest --coverage"` and go ahead run `npm run test:coverage` and open the following file in your browser: `open src/coverage/index.html`.

## VS Code
Vitest extention
- similar to jest 

```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "format": "prettier --write \"src/**/*.{js,jsx}\"",
    "lint": "eslint \"src/**/*.{js,jsx}\" --quiet",
    "test": "vitest --run",
    "test:watch": "vitest --watch"
  }
  ```

# Deploy
we can use netlify.com to deploy fast straight from our gh
