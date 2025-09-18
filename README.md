# simple-merge-class-names

A straightforward utility for merging CSS class names in _React (JSX)_ and other _JavaScript_ projects.

For Production look into [https://www.npmjs.com/package/clsx](https://www.npmjs.com/package/clsx)

## Table of Contents

-   [simple-merge-class-names](#simple-merge-class-names)
    -   [Table of Contents](#table-of-contents)
    -   [The Genocidal Occupation Is Starving Gaza](#the-genocidal-occupation-is-starving-gaza)
    -   [Installation](#installation)
        -   [_Recommended If Using VSCode: Install `Prettier` Extension_](#recommended-if-using-vscode-install-prettier-extension)
    -   [Usage](#usage)
        -   [TypeScript Definitions](#typescript-definitions)
        -   [Valid Arguments](#valid-arguments)
        -   [Invalid Arguments](#invalid-arguments)
        -   [Reason for warnings](#reason-for-warnings)
        -   [Conditional class inclusion](#conditional-class-inclusion)
        -   [Return Result](#return-result)
        -   [Chaining](#chaining)
    -   [Usage of Browser Debugger](#usage-of-browser-debugger)
    -   [VSCode Workflow To Minimize Typing Strain](#vscode-workflow-to-minimize-typing-strain)
    -   [Testing Source Code](#testing-source-code)
        -   [Run Once](#run-once)
        -   [Run Watch Mode](#run-watch-mode)
    -   [License](#license)

## The Genocidal Occupation Is Starving Gaza

-   [Donate](https://gazafunds.com/)

-   [(US) Demand Immediate Opening of ALL Gaza Border Crossings](https://act.uscpr.org/a/letaidin)

-   [Boycott Brands Supporting Gaza Holocaust](https://www.uplift.ie/bds/)

-   [Legal Action](https://www.hindrajabfoundation.org/perpetrators)

_Palestine is about fundamental non-negotiable human rights. End all financial and diplomatic ties with i\*rael_.

## Installation

```bash
pnpm add simple-merge-class-names
```

```bash
yarn add simple-merge-class-names
```

```bash
npm install simple-merge-class-names
```

### _Recommended If Using VSCode: Install `Prettier` Extension_

-   _[https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)_

_It will nicely format your code especially when you have lots of classes, and will significantly improve your visual experience._

_If you have a different IDE use an equivalent auto code formatter tool/extension_

## Usage

| Function                  | Prints console warnings | Activates debugger |
| ------------------------- | ----------------------- | ------------------ |
| `mergeClassNames`         | ✅                      | ❌                 |
| `mergeClassNamesDebugger` | ✅                      | ✅                 |

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

_Example, This is OK:_

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

Each below argument will be **ignored**, and cause a Dev Console **warning to be printed** to alert you:

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

```js
// Example: These arguments will be **ignored**, and a console.warn will be printed

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

![screenshot of console.warn warnings because invalid arguments were provided and ignored, so no silent failing](https://raw.githubusercontent.com/new-AF/simple-merge-class-names/main/.github/images/warnings.PNG)

### Reason for warnings

-   To avoid silent failures, because you will be pulling your hair asking why a Tailwind class isn't working only to figure out you passed an _object_, _array_ or an _empty string_ instead of a valid string. _(It could also be because of an unsupported class name or typo but this is beyond the scope of this package)_

### Conditional class inclusion

Use this pattern:

-   `condition ? "class-name" : false` with `false` serving as the valid fallback.
-   _or_ `condition === true ? "class-name" : false` if you want to be specific.

_Note:_ Avoid using the _short-circuit implicit syntax_ like this:

-   `condition && "class-name"`, beside less readable code, it can produce _falsy_ values which will be **_ignored_** _(e.g. `0`, `""`, `undefined`, and `null`)_.

```jsx
import { mergeClassNames } from "simple-merge-class-names";

const Component = () => {
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

**Once you see warnings in the console, the next step is to use `mergeClassNamesDebugger`**

1. Enable Debugger
    - _For chromium-based browsers it's On by default and you don't need to do anything AFAIK._
    - _For Firefox:_ Open **_Developer Tools_:**
        - _Make Sure_ **_Debugger_** _(tab)_ -> **`Pause on debugger statement`** is ticked.
        - Keep Dev Tools open.
          ![screenshot of Firefox Debugger section with Pause on debugger statement ticked on](https://raw.githubusercontent.com/new-AF/simple-merge-class-names/main/.github/images/debugger-enabled.png)

-   Use **`import {mergeClassNamesDebugger as mergeClassNames}`** to debug the entire file, and keep the rest intact.

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

-   or call `mergeClassNamesDebugger` directly.

    ```jsx
    import { mergeClassNamesDebugger } from "simple-merge-class-names";

    const Component = ({ condition }) => {
        return (
            <div
                className={mergeClassNamesDebugger(
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

-   Refresh the page, the debugger should connect:

    -   Navigate to the **_Call stack_**
    -   Click the function/component right before _`mergeClassNamesDebugger`_

    ![screenshot of Firefox debugger active because of `undefined` invalid class name argument](https://raw.githubusercontent.com/new-AF/simple-merge-class-names/main/.github/images/debugger-active.png)

-   Hover over the arguments, one or several should be invalid:
    ![screenshot of Firefox debugger active because of `undefined` invalid class name argument](https://raw.githubusercontent.com/new-AF/simple-merge-class-names/main/.github/images/debugger-3.png)

## VSCode Workflow To Minimize Typing Strain

Use single quotes around class names, and activate `Prettier` which will neatly format and arrange the classes.

-   Install `Prettier`
-   Enable `Editor: Word Wrap`:

    -   Open `Settings (UI)` → `Editor: Word Wrap` → `on`
    -   _or_ `User Settings (JSON)` and add this entry `"editor.wordWrap": "on"`

-   Use single quotes (<kbd>'</kbd>) around class names
-   Save the file

Example:

-   Before
    ![Screenshot of code before Prettier neatly formats code](https://raw.githubusercontent.com/new-AF/simple-merge-class-names/main/.github/images/before.png)

-   After

    ![Screenshot of code after Prettier neatly formats code](https://raw.githubusercontent.com/new-AF/simple-merge-class-names/main/.github/images/after.png)

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
