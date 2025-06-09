# simple-merge-class-names

A straightforward utility for merging CSS class names in `React + Tailwind` and other JavaScript projects.

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

## Install `Prettier` with VSCode (Most Recommended)

Install Prettier for VS Code for most optimal developer experience: [https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Or install an equivalent auto code formatter for your IDE.

## Usage

`mergeClassNames(...args)` is the single exported function from this package package.

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

Using individual strings for each class name can be tedious (see [Workflow to minimize typing strain](#workflow-to-minimize-typing-strain)), however it significantly enhances code readability and Developer Experience (DX). This is in contrast to hard-to-read strings like:

```jsx
function MyComponent() {
    return (
        <div className="app min-h-dvh grid grid-rows-[auto_1fr_auto] outline">
            Hello, world!
        </div>
    );
}
```

## Workflow to minimize typing strain:

![Screen recording of optimal DX in action: using this package with Prettier as it neatly arranges each class name on a new line](https://raw.githubusercontent.com/new-AF/simple-merge-class-names/main/.github/images/Reduce%20typing%20strain.gif)

-   Have `Prettier` installed
-   Use single quotes (<kbd>'</kbd>) for class names, often a single key press on many keyboards.
-   Save the file (<kbd>Ctrl+S</kbd>), and Prettier does the formatting heavy-lifting, it automatically:
    -   Replaces single quotes with double quotes.
    -   Neatly arranges each class name on a new line.

## Why the mismatch between exported Function, and Package name?

I wanted to name the package as `mergeClassNames` to reflect the single exported function, but the NPM Package Registry does not allow capital letters, only lower case and dash characters.

In addition there was already a package named `merge-class-names` but it is no longer maintained (and the developer recommends `clsx` instead).

## Where this package excels

While similar packages exist (`clsx`) with better features and potentially improved performance, `simple-merge-class-names` focuses on being very straightforward and easy to reason about, as defined in its source code.

## Source Code

```javascript
/**
 * mergeClassNames - a utility to merge CSS class names I developed for use in my `React` + `Tailwind` projects. Use it in conjunction with an auto-formatting tool like `Prettier`
 *
 * Example usage: <div className = {mergeClassNames("flex", "flex-col")}/>
 *
 * @license AGPL-3.0
 * Copyright (C) 2025 Abdullah Fatota
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
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

## Argument Handling

`mergeClassNames` accepts multiple arguments but filters out `null`, `undefined`, and empty strings (`""`), and the remaining values are either strings or are _implicitly converted_ to strings by the JavaScript engine.

Finally the end string values are merged and separated by spaces.

## Production Considerations

If you are considering this package for production, you might also want to look into `clsx` for more advanced features: [https://www.npmjs.com/package/clsx](https://www.npmjs.com/package/clsx)

## License

This project is licensed under the AGPL-3.0 License. See `LICENSE.txt` for full details.

## Enjoy 😉
