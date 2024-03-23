/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  RSS TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License.
  You may not use this file except in compliance with the License.
  You can get a copy of the License at https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/
import Image from './Image.js';
import Item from './Item.js';
import * as XML from 'tsl-core-xml';
export interface Channel extends XML.XMLTag {
    cloud?: string;
    copyright?: string;
    description?: string;
    docs?: string;
    generator?: string;
    image?: Image;
    items?: Array<Item>;
    language?: string;
    lastBuildDate?: Date;
    link?: string;
    managingEditor?: string;
    pubDate?: Date;
    subtitle?: string;
    tag: ('channel' | 'feed');
    title?: string;
    ttl?: number;
    webMaster?: string;
}
export declare namespace Channel {
    /**
     * Tests an object or value for the structure of the Channel tag.
     *
     * @param obj
     * Unknown object or value to test.
     *
     * @return
     * `true`, if the object is structured like the Channel tag.
     */
    function isChannel(obj: unknown): obj is Channel;
    /**
     * Parses an RSS channel.
     *
     * @param xml
     * The XML tag to parse.
     *
     * @return
     * Returns the parsed Channel tree of the RSS channel.
     */
    function parseChannel(xmlTag: XML.XMLTag): (Channel | undefined);
}
export default Channel;
