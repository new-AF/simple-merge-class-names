/**
 * mergeClassNames - A straightforward utility for merging CSS class names in React + Tailwind, and other JavaScript projects.
 *
 * @license AGPL-3.0
 * Copyright (C) 2025 Abdullah Fatota
 *
 * Example usage:
 * import { mergeClassNames } from "simple-merge-class-names";
 *
 * function MyComponent() {
 *   return (
 *     <div
 *       className={mergeClassNames(
 *         "app",
 *         "min-h-dvh",
 *         "grid",
 *         "grid-rows-[auto_1fr_auto]",
 *         "outline"
 *       )}
 *     >
 *       Hello, world!
 *     </div>
 *   );
 * }
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

const isTypeString = (val) => typeof val === "string";

const isNotEmptyString = (val) => val !== "";

export const mergeClassNames = (...args) => {
    const space = "\x20"; // " "; ASCII code for single space character;

    const stringsOnly = args.filter((val) => isTypeString(val));

    const trimmed = stringsOnly.map((val) => val.trim());

    const nonEmpty = trimmed.filter((val) => isNotEmptyString(val));

    const className = nonEmpty.join(space);
    return className;
};
