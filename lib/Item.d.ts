/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  RSS TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License.
  You may not use this file except in compliance with the License.
  You can get a copy of the License at https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/
import * as XML from 'tsl-core-xml';
export interface Item extends XML.XMLTag {
    author?: string;
    category?: Array<string>;
    comments?: string;
    content?: string;
    description?: string;
    enclosure?: string;
    guid?: string;
    link?: string;
    pubDate?: Date;
    source?: string;
    tag: ('entry' | 'item');
    title?: string;
    upDate?: Date;
}
export declare namespace Item {
    /**
     * Tests an object or value for the structure of the Item tag.
     *
     * @param obj
     * Unknown object or value to test.
     *
     * @return
     * `true`, if the object is structured like the Item tag.
     */
    function isItem(obj: unknown): obj is Item;
    /**
     * Parses an RSS item (or Atom entry).
     *
     * @param xml
     * The XML tag to parse.
     *
     * @return
     * Returns the parsed Item of the RSS item (or Atom entry).
     */
    function parseItem(xmlTag: XML.XMLTag): Item;
}
export default Item;
