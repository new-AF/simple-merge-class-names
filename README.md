# simple-merge-class-names

A straightforward utility for merging CSS class names in _React & Tailwind_ and other _JavaScript_ projects.

## Table of Contents

-   [We Stand with Palestine](#we-stand-with-palestine)
-   [Production Considerations](#production-considerations)
-   [Installation](#installation)
    -   [Install Prettier With VSCode (Most Recommended)](#install-prettier-with-vscode-most-recommended)
-   [Usage](#usage)
-   [Workflow To Minimize Typing Strain](#workflow-to-minimize-typing-strain)
-   [Type Definitions (of Exported Functions)](#type-definitions-of-exported-functions)
-   [Accepted Arguments](#accepted-arguments)
-   [Console Warning](#console-warning)
-   [Conditionally Include Class Names](#conditionally-include-class-names)
-   [Using `mergeClassNamesDebugger` And The Built-in Browser Debugger To Find And Fix Warnings](#using-mergeclassnamesdebugger-and-the-built-in-browser-debugger-to-find-and-fix-warnings)
-   [Strategies To Ensure Correct Arguments Are Sent to `mergeClassNames`](#strategies-to-ensure-correct-arguments-are-sent-to-mergeclassnames)
-   [Testing](#testing)
-   [Source Code (Partial)](#source-code-partial)
-   [Misc.](#misc)
    -   [Motivation](#motivation)
    -   [Why the Mismatch Between Exported Function and Package Name?](#why-the-mismatch-between-exported-function-and-package-name)
    -   [Where This Package Excels](#where-this-package-excels)
-   [License](#license)

## We Stand with Palestine <img src="https://raw.githubusercontent.com/new-AF/simple-merge-class-names/main/.github/images/ps.svg" alt="Flag of Palestine" height="11" />

-   [Donate](https://gazafunds.com/)

-   [Boycott Brands Supporting Genocide](https://www.uplift.ie/bds/)

-   [Legal Action](https://www.hindrajabfoundation.org/perpetrators)

## Production Considerations

In developing this package, I prioritized _code readability_, _strict input handling_, and _enhanced developer experience_. Consequently, **performance** and **_features_** were not the primary focus. If you are considering this package for production, you may also want to explore `clsx`: [https://www.npmjs.com/package/clsx](https://www.npmjs.com/package/clsx).

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

### Install `Prettier` With VSCode (Most Recommended)

-   [https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

-   Or use an equivalent auto code formatter for your IDE.

## Usage

Import `mergeClassNames(...args)` from the package, and use it in your _JSX_ or _JavaScript_ code.

```jsx
import { mergeClassNames } from "simple-merge-class-names";

const MyComponent = () => {
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

Or for [debugging purposes to fix console warnings](#using-mergeclassnamesdebugger-and-the-built-in-browser-debugger-to-find-and-fix-warnings):

-   Open the _Browser's Developer Tools_ and
-   Use `mergeClassNamesDebugger`

```jsx
import { mergeClassNamesDebugger } from "simple-merge-class-names";

const MyComponent = () => {
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

## Workflow To Minimize Typing Strain

-   Have `Prettier` installed
-   Have `Editor: Word Wrap` enabled in VS Code:

    -   `Open Settings (UI)` → `Editor: Word Wrap` → `on`
    -   Or `Open User Settings (JSON)` and add this entry:

        `"editor.wordWrap": "on"`

-   **Use single quotes** (<kbd>'</kbd>) for class names, often a single key press on many keyboards.
-   **Save the file** (<kbd>Ctrl+S</kbd>), which activates `Prettier` to auto-format the file, it will:

    -   Replace single quotes with double quotes.
    -   Neatly arrange each class name on a new line.

### Result

#### Before

![Screenshot of code before Prettier neatly formats code](https://raw.githubusercontent.com/new-AF/simple-merge-class-names/main/.github/images/before.png)

#### After

![Screenshot of code after Prettier neatly formats code](https://raw.githubusercontent.com/new-AF/simple-merge-class-names/main/.github/images/after.png)

## Type Definitions (of Exported Functions)

```jsx
mergeClassNames: (...args: (string | false)[]) => string;
```

```jsx
mergeClassNamesDebugger: (...args: (string | false)[]) => string;
```

Both `mergeClassNames` and `mergeClassNamesDebugger` always return a string.

-   If no inputs are provided (e.g. `mergeClassNames()`) or if invalid inputs are given (e.g. `mergeClassNames(undefined, " ")`), an _empty string_ is returned: `""`.

## Acceptable Arguments

`mergeClassNames(...args)` and `mergeClassNamesDebugger(...args)` only accept the following arguments:

-   **Strings that are not empty, and are not whitespace** (e.g. `"app"`, `"min-h-dvh"`, `"   grid   "`)

-   The boolean value **`false`**

Any other input is considered an invalid argument and will be ignored, resulting in a matching warning being logged. Invalid argument types include:

-   _Empty strings_ (`""`),
-   _Whitespace combinations_ (e.g. `"   "`, `"\n"`, `"  \n\t "`, etc...),,
-   `null`,
-   `undefined`,
-   _Numbers_,
-   _Objects_,
-   _Arrays_

## Console Warning

Whenever invalid arguments are passed to `mergeClassNames`, they are not silently ignored, as this can lead to subtle bugs and increase technical debt. Instead, a `console.warn` is shown in the _Developer Console_ to notify the developer of a potentially deeper issue that requires attention. For example:

```plaintext
[mergeClassNames] Warning: invalid arguments were provided and ignored:

        * Replace "mergeClassNames" with "mergeClassNamesDebugger" without changing any arguments, and open the Developer Console, or attach Debugger (see README.md).

        * Expected all arguments to be either strings or value `false`, but got 5 invalid value(s):
        [
        (1/5): >undefined< of type "undefined",
        (2/5): > test < of type "object",
        (3/5): >[object Object]< of type "object",
        (4/5): >true< of type "boolean",
        (5/5): >null< of type "object"
        ]

        * Expected 0 empty strings, but got 2 invalid value(s):
        [
        (1/2): ><,
        (2/2): >   <
        ]
```

## Conditionally Include Class Names

To conditionally include a class name, use the _conditional operator_ as follows:

-   `condition ? "class-name" : false`, with `false` serving as the fallback value to ensure clear and warning-free code.

This approach is effective because `false` will never result in a warning from the function.

**Important**: Avoid using the _short-circuit implicit syntax_ like this:

-   `condition && "class-name"`, as it can produce falsy values such as `0`, `""`, `undefined`, and `null`, which will lead to warnings being logged.

```jsx
import { mergeClassNames } from "simple-merge-class-names";

const MyComponent = () => {
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

## Using `mergeClassNamesDebugger` And The Built-in Browser Debugger To Find And Fix Warnings

```jsx
import { mergeClassNamesDebugger } from "simple-merge-class-names";

const MyComponent = () => {
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

`mergeClassNamesDebugger` is a drop-in replacement for `mergeClassNames` but with the added _benefit_ that it will activate the built-in **_debugger_** inside browsers like _FireFox_, _Chrome_, _Safari_ and even _VS Code_ if configured properly.

This built-in JavaScript feature gained wide-spread support from major browsers around 2012, allowing you to access it with minimal effort. To utilize it, simply follow these two steps:

1. **_Open the Browser's Developer Tools_** to inform the JavaScript engine that the debugger is _enabled_.
2. **_Replace_** `mergeClassNames` with **`mergeClassNamesDebugger`** _without_ altering any of the provided arguments.

_When the debugger is enabled (i.e. *Browser's Developer Tools* is open) and an invalid argument such as `undefined` or `" "` is passed to `mergeClassNamesDebugger`, the JavaScript engine will automatically pause execution and highlight the invalid argument. You simply need to select the offending component (e.g. `Container.jsx`) from the Call Stack._

When the debugger is active, it will appear as shown in this screenshot (in _Firefox_):

![Firefox Debugger automatically paused execution when undefined was passed to mergeClassNamesDebugger](https://raw.githubusercontent.com/new-AF/simple-merge-class-names/main/.github/images/debugger.png)

## Strategies To Ensure Correct Arguments Are Sent to `mergeClassNames`

-   Use the _conditional operator_ to conditionally including class names:

```jsx
import { mergeClassNames } from "simple-merge-class-names";

const MyComponent = () => {
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

## Testing

This project uses `Vitest` as the test runner for fast and modern testing.

#### Run All Tests Once

```bash
git clone https://github.com/new-AF/simple-merge-class-names
cd simple-merge-class-names
pnpm install
pnpm test
```

#### Run Tests In Watch Mode

```bash
pnpm test:watch
```

## Source Code (Partial)

```javascript
/**
 * mergeClassNames - A straightforward utility for merging CSS class names in React + Tailwind, and other JavaScript projects.
 *
 * @license AGPL-3.0
 * Copyright (C) 2025 Abdullah Fatota
 *
 * ...
 */

const mergeClassNamesCore = ({ args, activateDebugger }) => {
    const space = "\x20"; // ASCII code for a single space character (" "), decimal 32

    const [_, nonFalseValues] = partition(args, isValueFalse); // ignore all false values used for conditional class inclusion
    const [strings, nonStrings] = partition(nonFalseValues, isTypeString);
    const [emptyStrings, nonEmptyStrings] = partition(strings, isEmptyString);
    const trimmed = nonEmptyStrings.map((val) => val.trim());
    const className = trimmed.join(space);

    /* Don't silently ignore invalid input, explicitly disclose them as it may indicate a bigger problem */
    warnInvalidArguments({ nonStrings, emptyStrings, activateDebugger });

    return className;
};

export const mergeClassNames = (...args) =>
    mergeClassNamesCore({ args, activateDebugger: false });

export const mergeClassNamesDebugger = (...args) =>
    mergeClassNamesCore({ args, activateDebugger: true });
```

## Misc.

### Motivation

This package aims to improve code readability and developer experience in _React & Tailwind_ projects by enforcing strict input handling. It logs warnings for invalid arguments, helping developers catch and fix underlying issues _early_.

While writing class names as separate strings may seem tedious, the [workflow](#workflow-to-minimize-typing-strain) reduces friction and the overall process results in more readable and maintainable code in contrast to using single long strings:

```jsx
const MyComponent = () => {
    return (
        <div className="app min-h-dvh grid grid-rows-[auto_1fr_auto] outline">
            Hello, world!
        </div>
    );
};
```

### Why the Mismatch Between Exported Function and Package Name?

I wanted to name the package `mergeClassNames` to reflect the exported function, but the NPM Package Registry doesn't allow capital letters, only lower case and dash characters.

In addition there was already a package named `merge-class-names` but it is no longer maintained (and the developer recommends `clsx` instead).

## License

This project is licensed under the AGPL-3.0 License. See `LICENSE.txt` for full details.

---

Enjoy 😉
