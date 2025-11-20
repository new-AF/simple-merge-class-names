# simple-merge-class-names

Safely merge multiple CSS class names in _React/JSX/JavaScript_. Supports conditional class inclusion, and ignores invalid arguments.

> For Production look into [https://www.npmjs.com/package/clsx](https://www.npmjs.com/package/clsx)

## Table of Contents

-   [simple-merge-class-names](#simple-merge-class-names)
    -   [Table of Contents](#table-of-contents)
    -   [The Genocidal Occupation Is Starving Gaza](#the-genocidal-occupation-is-starving-gaza)
    -   [Installation](#installation)
    -   [Usage](#usage)
        -   [TypeScript Definitions](#typescript-definitions)
        -   [Valid Arguments](#valid-arguments)
        -   [Invalid Arguments](#invalid-arguments)
        -   [Conditional class inclusion](#conditional-class-inclusion)
        -   [Return Result](#return-result)
        -   [Chaining](#chaining)
    -   [Usage of Browser Debugger](#usage-of-browser-debugger)
    -   [Testing Source Code](#testing-source-code)
        -   [Run Once](#run-once)
        -   [Run Watch Mode](#run-watch-mode)
    -   [License](#license)

## The Genocidal Occupation Is Starving Gaza

-   [Donate](https://gazafunds.com/)

-   [(US) Demand Immediate Opening of ALL Gaza Border Crossings](https://act.uscpr.org/a/letaidin)

-   [Boycott Brands Supporting Gaza Holocaust](https://www.uplift.ie/bds/)

-   [Legal Action](https://www.hindrajabfoundation.org/perpetrators)

_Palestine is fundamental human rights, not a political issue. End all financial and diplomatic ties with genocidal i\*rael_.

## Installation

```bash
pnpm add simple-merge-class-names

# or
yarn add simple-merge-class-names

# or
npm install simple-merge-class-names
```

> _Recommended For VSCode: Install the `Prettier` extension_ _[https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) as it will nicely your format classes, and alleviate wrist strain because you will use single quotes for class names._

## Usage

| Function                  | Prints console warnings | Activates debugger |
| ------------------------- | ----------------------- | ------------------ |
| `mergeClassNames`         | ✅                      | ❌                 |
| `mergeClassNamesDebugger` | ✅                      | ✅                 |

_Example_:

```jsx
import { mergeClassNames } from "simple-merge-class-names";

const Component = ({ condition }) => {
    return (
        <div
            className={mergeClassNames(
                "app",
                condition ? "min-h-dvh" : false,
                "grid",
                "grid-rows-[auto_1fr_auto]",
                "outline"
            )}
        >
            Hello, world!
        </div>
    );
};
```

Acceptable Input is either:

1. non-empty string, not whitespace, of length >=1
2. `value`

Likewise Return value is either:

### TypeScript Definitions

```ts
export declare const mergeClassNames: (
    ...args: (string | false)[]
) => string | false;

export declare const mergeClassNamesDebugger: (
    ...args: (string | false)[]
) => string | false;
```

### Valid Arguments

Only 2:

1. **Valid strings, not whitespace, of length >= 1**

    _(As long as you have content in the string you're OK)_

2. **`false`**

```js
mergeClassNames(
    "mx-auto",
    "min-dvh    ",
    "   flex",
    "      grid      ",
    "italic     font-bold   ",
    `
        gap-y-4
    `,
    false,
    condition ? "daisy-btn-active" : false
);
```

### Invalid Arguments

-   **Empty strings**: _(e.g. `""`)_
-   **Whitespace** any consecutive combination of the following:
    -   new lines,
    -   spaces,
    -   tabs
    -   _(e.g._ `"   "`, `"\n "`, `"  \t  \n "`, _etc.)_
-   **`true`**
-   **`undefined`**
-   **`null`**
-   **Objects**
-   **Numbers**
-   **Big Int**
-   **Symbols**

_All of above will be **ignored**, and cause a **warning to be printed** to the developer console._

```js
const someVariable = "";

mergeClassNames(
    someVariable, // empty string
    "   ", // whitespace
    "\n ", // whitespace
    "  \t  \n ", // whitespace
    `           // whitespace
        \n
    `,
    true, // true
    undefined, // undefined
    null, // null
    {
        // object
        name: "value",
        email: "email@example.com",
    },
    123, // number
    123.45 // number
);
```

![screenshot of console.warn warnings because invalid arguments were provided and ignored, so no silent failing](https://raw.githubusercontent.com/new-AF/simple-merge-class-names/main/.github/images/console-warnings.png)

### Conditional class inclusion

Use this pattern:

```jsx
mergeClassNames(condition ? "min-h-dvh" : false);

// or if you want preciseness.
mergeClassNames(condition === true ? "min-h-dvh" : false);
```

> _Avoid using the short-circuit syntax (`condition && "class-name"`) because in addition to being less readable code, it can produce falsy values which will be ignored (e.g. `0`, `""`, `undefined`, and `null`)_.

### Return Result

Either:

1. **Valid `string`, never whitespace, always length >= 1**

2. _or_ **`false`** _(if all input arguments were invalid)_

### Chaining

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
                "outline"
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
    -   Navigate to the **_Call stack_**
    -   Click the function/component right before _`mergeClassNamesDebugger`_

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
