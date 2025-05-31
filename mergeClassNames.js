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
