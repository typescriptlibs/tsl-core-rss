/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  RSS TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License.
  You may not use this file except in compliance with the License.
  You can get a copy of the License at https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/
import Side from './Side.js';
/**
 * Loads an RSS document from the given URL.
 *
 * @param url
 * The URL to load the RSS document from.
 *
 * @return
 * Returns a Promise of the parsed Side tree of the RSS document.
 *
 * @throws
 * Throws the response, if not a valid RSS document.
 */
export declare function fetchRSS(url: (string | URL)): Promise<Side>;
/**
 * Parses an RSS document.
 *
 * @param text
 * The text string of the RSS document.
 *
 * @return
 * Returns the parsed Side tree of the RSS document, or `undefined`.
 */
export declare function parseRSS(text: string): (Side | undefined);
declare const _default: {
    fetchRSS: typeof fetchRSS;
    parseRSS: typeof parseRSS;
};
export default _default;
