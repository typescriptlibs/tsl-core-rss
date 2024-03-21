/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  RSS TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License.
  You may not use this file except in compliance with the License.
  You can get a copy of the License at https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/
/* *
 *
 *  Imports
 *
 * */
import Side from './Side.js';
/* *
 *
 *  Functions
 *
 * */
/**
 * Loads an RSS document from the given URL.
 *
 * @param url
 * The URL to load the RSS document from.
 *
 * @return
 * Returns a Promise of the parsed Side tree of the RSS document.
 */
export async function fetchRSS(url) {
    return Side.parseSide(await (await fetch(url)).text());
}
/**
 * Parses an RSS document.
 *
 * @param text
 * The text string of the RSS document.
 *
 * @return
 * Returns the parsed Side tree of the RSS document.
 */
export function parseRSS(text) {
    return Side.parseSide(text);
}
/* *
 *
 *  Default Export
 *
 * */
export default {
    fetchRSS,
    parseRSS
};
