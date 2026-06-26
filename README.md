- [Why this package exists](#why-this-package-exists)
- [Why not `clsx`](#why-not-clsx)
- [Exported functions](#exported-functions)
- [Quick start](#quick-start)
- [Valid arguments](#valid-arguments)
- [Invalid arguments](#invalid-arguments)
- [Github](#github)
- [License](#license)

# Why this package exists

I got tired of squinting at the single line TailwindCSS `className = "..." ` string cramming a dozen utility classes with no delimiter between them, so I organically created a function that would split each string on a new line, and merge them back.

# Why not `clsx`

I didn't like the unreadable [code](https://github.com/lukeed/clsx/blob/master/src/index.js) and the fact it accepts all types of arguments. I thought my engineering approach is better both in terms of code readability and strictness.

I used TypeScript and a functional programming approach to develop it.

# Exported functions

|                               | Warns  | Invokes debugger |
| ----------------------------- | ------ | ---------------- |
| `mergeClassNames`             | ✅     | ❌               |
| `mergeClassNamesDebugger`     | ✅     | ✅               |
| `createCustomMergeClassNames` | Custom | Custom           |

# Quick start

```jsx
/*
{
    "fileName": "App.jsx"
}
*/
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

# Valid arguments

Valid arguments are:

1. `string`s, that are not fully whitespace, these will be the class names you pass.
2. Empty string `""`
3. `null`
4. `undefined`
5. `false`

The latter four are valid but will be ignored as they're commonly used in conditional expressions.

# Invalid arguments

- Fully whitespace strings
- Objects
- Arrays
- `true`
- Symbols

These will cause a console warning to be printed to alert you something might be off.

# Github

[https://github.com/new-AF/simple-merge-class-names](https://github.com/new-AF/simple-merge-class-names)

# License

This project is licensed under the AGPL-3.0 License. See `LICENSE.txt` for full details.

Enjoy 😉
