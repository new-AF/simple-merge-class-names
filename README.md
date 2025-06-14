# simple-merge-class-names

A straightforward utility for merging CSS class names in `React + Tailwind` and other JavaScript projects.

## Table of Contents

-   [Installation](#installation)
    -   [Install Prettier With VSCode (Most Recommended)](#install-prettier-with-vscode-most-recommended)
-   [Usage](#usage)

    -   [Conditionally Include Class Names](#conditionally-include-class-names)

    -   [Workflow To Minimize Typing Strain](#workflow-to-minimize-typing-strain)

-   [Argument Handling](#argument-handling)

    -   [Console Warning for Invalid Arguments](#console-warning-for-invalid-arguments)

    -   [Breaking Changes From Version 1.X.X](#breaking-changes-from-version-1xx)

-   [Testing](#testing)
-   [Source Code (Partial)](#source-code-partial)
-   [Misc.](#misc)

    -   [Why the Mismatch Between Exported Function and Package Name?](#why-the-mismatch-between-exported-function-and-package-name)
    -   [Where This Package Excels](#where-this-package-excels)

-   [Production Considerations](#production-considerations)
-   [License](#license)

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

[https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Or install an equivalent auto code formatter for your IDE.

## Usage

Import `mergeClassNames(...args)` from the package, and use it in your JSX or JavaScript code.

```jsx
import { mergeClassNames } from "simple-merge-class-names";

function MyComponent() {
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
}
```

While using separate strings for each class name can be tedious, see [Workflow To Minimize Typing Strain](#workflow-to-minimize-typing-strain), it significantly enhances code readability and Developer Experience (DX). This is in contrast to hard-to-read strings like:

```jsx
function MyComponent() {
    return (
        <div className="app min-h-dvh grid grid-rows-[auto_1fr_auto] outline">
            Hello, world!
        </div>
    );
}
```

### Conditionally Include Class Names

To conditionally include a class, use the ternary operator like this: `condition ? 'class-name' : false` to maintain clear and warning-free code.

```jsx
mergeClassNames(
    "app",
    condition ? "min-h-dvh" : false,
    "grid",
    "grid-rows-[auto_1fr_auto]",
    "outline"
);
```

**Important**: Avoid using the short-circuit implicit syntax `condition && "class-name"` because it can produce falsy values like `0`, `""`, `undefined`, `null`, which will cause warnings to be logged.

### Workflow To Minimize Typing Strain

![Screen recording of optimal DX in action: using this package with Prettier as it neatly arranges each class name on a new line](https://raw.githubusercontent.com/new-AF/simple-merge-class-names/main/.github/images/Reduce%20typing%20strain.gif)

-   Have `Prettier` installed
-   Have `Editor: Word Wrap` enabled in VS Code:

    -   `Open Settings (UI)` → `Editor: Word Wrap` → `on`
    -   Or `Open User Settings (JSON)` and add this entry:

        `"editor.wordWrap": "on"`

-   Use single quotes (<kbd>'</kbd>) for class names, often a single key press on many keyboards.
-   Save the file (<kbd>Ctrl+S</kbd>), and Prettier does the formatting heavy-lifting, it automatically:
    -   Replaces single quotes with double quotes.
    -   Neatly arranges each class name on a new line.

## Argument Handling

`mergeClassNames(...args)` accepts only the following arguments:

-   **Non-empty strings** (for example: `"app"`, `"min-h-dvh"`)

-   The boolean value **`false`**

Everything else like empty strings (`""`), `null`, `undefined`, numbers, objects and arrays is _ignored_ and logged via `console.warn` to alert the user of a potentially deeper issue.

### Console Warning for Invalid Arguments

Invalid arguments are not silently ignored, as they may indicate a deeper issue. A single warning is logged to the developer console whenever these arguments are passed and ignored.

Example output:

```plaintext
[mergeClassNames] Warning: invalid arguments were provided and were ignored:
    - Expected all arguments to be strings, but got 4 non-string values: [(1/4): (undefined) of type "undefined", (2/4): (test) of type "object", (3/4): ([object Object]) of type "object", (4/4): (null) of type "object"].
    - Expected 0 empty strings, but got 2.
```

### Breaking Changes From Version 1.X.X

In pervious versions, arguments that were not strings were implicitly converted to strings by the JavaScript engine.

## Testing

This project uses `Vitest` as the test runner for fast, modern testing.

#### Run All Testing Once

```bash
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
 ...
 */

const isTypeString = (val) => typeof val === "string";

const isNonEmptyString = (val) => val !== "";

const partition = (array, keepPredicate) => {
    const keep = [];
    const ignore = [];
    for (const element of array) {
        (keepPredicate(element) ? keep : ignore).push(element);
    }
    return [keep, ignore];
};

export const mergeClassNames = (...args) => {
    const space = "\x20"; // ASCII code for a single space character (" "), decimal 32

    const [strings, nonStrings] = partition(args, isTypeString);

    const trimmed = strings.map((val) => val.trim());

    const [nonEmptyStrings, emptyStrings] = partition(
        trimmed,
        isNonEmptyString
    );

    const className = nonEmptyStrings.join(space);

    /* Don't silently ignore invalid input, explicitly disclose them as it may indicate a bigger problem */
    const warn = [];
    /* ... */
```

## Misc.

### Why the Mismatch Between Exported Function and Package Name?

I wanted to name the package as `mergeClassNames` to reflect the single exported function, but the NPM Package Registry does not allow capital letters, only lower case and dash characters.

In addition there was already a package named `merge-class-names` but it is no longer maintained (and the developer recommends `clsx` instead).

### Where This Package Excels

While similar packages exist (`clsx`) with better features and potentially improved performance, `simple-merge-class-names` focuses on being very straightforward and easy to reason about, as defined in its source code.

## Production Considerations

If you are considering this package for production, you might also want to look into `clsx`: [https://www.npmjs.com/package/clsx](https://www.npmjs.com/package/clsx)

## License

This project is licensed under the AGPL-3.0 License. See `LICENSE.txt` for full details.

---

Enjoy 😉
