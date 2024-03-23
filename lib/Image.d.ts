/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  RSS TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License.
  You may not use this file except in compliance with the License.
  You can get a copy of the License at https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/
import * as XML from 'tsl-core-xml';
export interface Image extends XML.XMLTag {
    description?: string;
    height?: number;
    link?: string;
    tag: ('icon' | 'image' | 'logo');
    title?: string;
    url?: string;
    width?: number;
}
export declare namespace Image {
    /**
     * Tests an object or value for the structure of the Image tag.
     *
     * @param obj
     * Unknown object or value to test.
     *
     * @return
     * `true`, if the object is structured like the Image tag.
     */
    function isImage(obj: unknown): obj is Image;
    /**
     * Parses an RSS channel image.
     *
     * @param xml
     * The XML tag to parse.
     *
     * @return
     * Returns the parsed Image tag of the RSS channel, or `undefined`.
     */
    function parseImage(xmlTag: XML.XMLTag): (Image | undefined);
}
export default Image;
