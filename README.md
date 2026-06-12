# simple-merge-class-names

A class names merger for TypeScript, JavaScript, TSX / JSX (React).

> For production purposes there is also [https://www.npmjs.com/package/clsx](https://www.npmjs.com/package/clsx)

## Table of Contents

- [simple-merge-class-names](#simple-merge-class-names)
    - [Table of Contents](#table-of-contents)
    - [Stop Starving Gaza](#stop-starving-gaza)
    - [Install](#install)
        - [Install `Prettier` too](#install-prettier-too)
    - [Exported Functions](#exported-functions)
    - [Non-scale Usage](#non-scale-usage)
        - [Example](#example)
    - [Scale Usage](#scale-usage)
        - [Create intermediary `@/mergeClassNames.js`](#create-intermediary-mergeclassnamesjs)
            - [Project Structure](#project-structure)
            - [Enable `@`-style Imports in Vite](#enable--style-imports-in-vite)
        - [Example](#example-1)
            - [During Dev, Debug Entire Project](#during-dev-debug-entire-project)
    - [Valid Arguments](#valid-arguments)
        - [Example](#example-2)
    - [Invalid Arguments](#invalid-arguments)
        - [Example](#example-3)
            - [Developer Console Warnings](#developer-console-warnings)
    - [Conditional Class Inclusion](#conditional-class-inclusion)
        - [Avoid Short-circuit Syntax](#avoid-short-circuit-syntax)
    - [Return Result](#return-result)
        - [Example](#example-4)
    - [Side Effect](#side-effect)
        - [Example](#example-5)
    - [Chaining](#chaining)
    - [Usage of Browser Debugger](#usage-of-browser-debugger)
    - [Testing Source Code](#testing-source-code)
        - [Run Once](#run-once)
        - [Run Watch Mode](#run-watch-mode)
    - [License](#license)

## Stop Starving Gaza

- [Donate Direct Aid to Gazan Families](https://gazafunds.com/)

- [Call US Congress and Demand Immediate Opening of ALL Gaza Border Crossings](https://act.uscpr.org/a/letaidin)

- [Boycott Brands Supporting Gaza Holocaust](https://www.uplift.ie/bds/)

- [Legal Action](https://www.hindrajabfoundation.org/perpetrators)

## Install

```bash
pnpm add simple-merge-class-names

# or
yarn add simple-merge-class-names

# or
npm install simple-merge-class-names
```

### Install `Prettier` too

[https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

It will nicely format and split your classes across new lines, and alleviate wrist strain because you will use single quotes (single key) instead of double (2 keys).

## Exported Functions

|                           | `console.warn`s | Invokes JS `debugger;` statement on invalid arguments, which pauses execution when Debugger is attached |
| ------------------------- | --------------- | ------------------------------------------------------------------------------------------------------- |
| `mergeClassNames`         | ✅              | ❌                                                                                                      |
| `mergeClassNamesDebugger` | ✅              | ✅                                                                                                      |

## Non-scale Usage

### Example

```jsx
// src/App.jsx
import { mergeClassNames } from "simple-merge-class-names";

const Component = ({ condition }) => {
    return (
        <div
            className={mergeClassNames(
                "app",
                condition ? "min-h-dvh" : false,
                "grid",
                "grid-rows-[auto_1fr_auto]",
                "outline",
            )}
        >
            Hello, world!
        </div>
    );
};
```

## Scale Usage

![diagram explanation of best way to use package](./.github/images/root-file.png)

### Create intermediary `@/mergeClassNames.js`

#### Project Structure

```
my-react-app/
├─ src/
│  ├─ components/
│  ├─ mergeClassNames.js  // <- create it here
│  ├─ App.jsx
│  └─ index.js
├─ package.json
├─ vite.config.js
└─ README.md
```

#### Enable `@`-style Imports in Vite

`@` points to `my-react-app/src`

```js
// vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],

    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"), //  @ now points to "my-react-app/src"
        },
    },
});
```

```js
// src/mergeClassNames.js

export { mergeClassNames } from "simple-merge-class-names";

// export { mergeClassNames as mergeClassNamesDebugger } from "simple-merge-class-names";
```

And toggle-comment between the first and second lines as needed.

### Example

#### During Dev, Debug Entire Project

```js
// @/mergeClassNames.js

// export { mergeClassNames } from "simple-merge-class-names";

export { mergeClassNames as mergeClassNamesDebugger } from "simple-merge-class-names";
```

```jsx
// @/App.jsx

import { mergeClassNames } from "@/mergeClassNames.js";

const Component = ({ condition }) => {
    return (
        <div
            className={mergeClassNames(
                "app",
                condition ? "min-h-dvh" : false,
                "grid",
                "grid-rows-[auto_1fr_auto]",
                "outline",
            )}
        >
            Hello, world!
        </div>
    );
};
```

## Valid Arguments

Only 2:

1. A valid string (not empty, not fully whitespace)
2. Value `false`

### Example

```js
mergeClassNames(
    condition ? "daisy-btn-active" : false
    "mx-auto",
    "min-dvh    ",
    "   flex",
    "      grid      ",
    "italic     font-bold   ",
    `
        gap-y-4
    `,
);
```

## Invalid Arguments

Anything that is not a valid argument, this includes:

- Invalid strings:
    - Empty strings: _(`""`)_
    - Fully whitespace strings: any consecutive combination of the following:
        - new lines,
        - spaces,
        - tabs
        - _(e.g. `"   "`, `"\n "`, `"  \t  \n "`, etc.)_
- `true`
- `undefined`
- `null`
- Objects
- Numbers
- Big Int
- Symbols

_All of above will be **ignored**, and cause a `console.warn` to be printed_

### Example

```js
const someVariable = "";

mergeClassNames(
    someVariable,
    "   ",
    "\n ",
    "  \t  \n ",
    `          
        \n
    `,
    true,
    undefined,
    null,
    {
        name: "name",
        email: "name@example.com",
    },
    123,
    123.45,
);
```

#### Developer Console Warnings

![screenshot of console.warn warnings because invalid arguments were provided and ignored, so no silent failing](https://raw.githubusercontent.com/new-AF/simple-merge-class-names/main/.github/images/console-warnings.png)

## Conditional Class Inclusion

```jsx
mergeClassNames(condition ? "min-h-dvh" : false);

// or if you want preciseness.
mergeClassNames(condition === true ? "min-h-dvh" : false);
```

### Avoid Short-circuit Syntax

Avoid the syntax (`condition && "class-name"`) because it can produce falsy values (e.g. `0`, `""`, `undefined`, `null`) which will be ignored and warned about.

## Return Result

String of all merged valid classes. Invalid arguments are ignored and warned about.

### Example

```jsx
import { mergeClassNames } from "simple-merge-class-names";

// "app min-h-dvh grid grid-rows-[auto_1fr_auto] outline"
mergeClassNames(
    " app ",
    undefined,
    [" test "],
    { key: "value" },
    "",
    "min-h-dvh",
    "grid ",
    true,
    null,
    "grid-rows-[auto_1fr_auto]",
    "outline",
    " ",
);
```

## Side Effect

`console.warn`s if arguments contain invalid arguments.

### Example

```
Ignored invalid argument: >undefined< (undefined)
Ignored invalid argument: > test < (object)
Ignored invalid argument: >[object Object]< (object)
Ignored empty string: ""
Ignored invalid argument: >true< (boolean)
Ignored invalid argument: >null< (object)
Ignored whitespace string:
```

> _It can be empy_

1. **Valid `string`, never whitespace, always length >= 1**

## Chaining

Because of safe return types you can chain calls safely without worrying about warnings or arguments being ignored.

_So this is OK:_

```js
mergeClassNames(condition ? "disabled" : mergeClassNames(...) )
```

## Usage of Browser Debugger

1.  Use **`import {mergeClassNamesDebugger as mergeClassNames}`** to debug the entire file.

```jsx
import { mergeClassNamesDebugger as mergeClassNames } from "simple-merge-class-names";

const Component = ({ condition }) => {
    return (
        <div
            className={mergeClassNames(
                "app",
                condition ? "min-h-dvh" : false,
                "grid",
                "grid-rows-[auto_1fr_auto]",
                "outline",
            )}
        >
            Hello, world!
        </div>
    );
};
```

2. Enable Debugger
    - _For chromium-based browsers it's On by default and you don't need to do anything AFAIK._
    - _For Firefox:_ Open **_Developer Tools_:**
        - _Make Sure_ **_Debugger_** _(tab)_ -> **`Pause on debugger statement`** is ticked.
        - Keep Dev Tools open.

![screenshot of Firefox Debugger section with Pause on debugger statement ticked on](https://raw.githubusercontent.com/new-AF/simple-merge-class-names/main/.github/images/debugger-check.png)

3.  Refresh the page, the debugger should connect:
    - Navigate to the **_Call stack_**
    - Click the function/component right before _`mergeClassNamesDebugger`_

![screenshot of Firefox debugger active because of `undefined` invalid class name argument](https://raw.githubusercontent.com/new-AF/simple-merge-class-names/main/.github/images/debugger-active.png)

4. Hover over the arguments, one or several should be invalid:

![screenshot of Firefox debugger active because of `undefined` invalid class name argument](https://raw.githubusercontent.com/new-AF/simple-merge-class-names/main/.github/images/debugger-3.png)

## Testing Source Code

This project uses `Vitest` as the test runner for fast and modern testing.

### Run Once

```bash
git clone https://github.com/new-AF/simple-merge-class-names
cd simple-merge-class-names
pnpm install
pnpm test
```

### Run Watch Mode

```bash
pnpm test:watch
```

## License

This project is licensed under the AGPL-3.0 License. See `LICENSE.txt` for full details.

---

Enjoy 😉
