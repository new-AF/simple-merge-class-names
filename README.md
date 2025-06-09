# simple-merge-class-names

A straightforward utility for merging CSS class names in `React + Tailwind` and other JavaScript projects.

## Table of Contents

-   [Installation](#installation)
    -   [Install Prettier With VSCode (Most Recommended)](#install-prettier-with-vscode-most-recommended)
-   [Usage](#usage)
    -   [Workflow To Minimize Typing Strain](#workflow-to-minimize-typing-strain)
-   [Why the Mismatch Between Exported Function and Package Name?](#why-the-mismatch-between-exported-function-and-package-name)
-   [Where This Package Excels](#where-this-package-excels)
-   [Source Code](#source-code)
    -   [Argument Handling](#argument-handling)
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
                "min-h-dvh",
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

## Why the Mismatch Between Exported Function and Package Name?

I wanted to name the package as `mergeClassNames` to reflect the single exported function, but the NPM Package Registry does not allow capital letters, only lower case and dash characters.

In addition there was already a package named `merge-class-names` but it is no longer maintained (and the developer recommends `clsx` instead).

## Where This Package Excels

While similar packages exist (`clsx`) with better features and potentially improved performance, `simple-merge-class-names` focuses on being very straightforward and easy to reason about, as defined in its source code.

## Source Code

```javascript
/**
 * mergeClassNames - A straightforward utility for merging CSS class names in React + Tailwind, and other JavaScript projects.
 ...
 */
const isDefined = (val) => val !== undefined && val !== null;

const isNotEmptyString = (val) => val !== "";

export const mergeClassNames = (...args) => {
    const space = " ";
    const values = args.filter(
        (val) => isDefined(val) && isNotEmptyString(val)
    );
    const className = values.join(space);
    return className;
};
```

### Argument Handling

`mergeClassNames` accepts multiple arguments but filters out `null`, `undefined`, and empty strings (`""`). Remaining values are either strings or are _implicitly converted_ to strings by the JavaScript engine, then joined with spaces to produce the final class name string.

## Production Considerations

If you are considering this package for production, you might also want to look into `clsx` for more advanced features: [https://www.npmjs.com/package/clsx](https://www.npmjs.com/package/clsx)

## License

This project is licensed under the AGPL-3.0 License. See `LICENSE.txt` for full details.

Enjoy 😉
