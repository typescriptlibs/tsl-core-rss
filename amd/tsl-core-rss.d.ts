declare module "Item" {
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
    export namespace Item {
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
}
declare module "Channel" {
    /*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\
    
      RSS TypeScript Library
    
      Copyright (c) TypeScriptLibs and Contributors
    
      Licensed under the MIT License.
      You may not use this file except in compliance with the License.
      You can get a copy of the License at https://typescriptlibs.org/LICENSE.txt
    
    \*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/
    import Item from "Item";
    import * as XML from 'tsl-core-xml';
    export interface Channel extends XML.XMLTag {
        cloud?: URL;
        copyright?: string;
        description?: string;
        docs?: string;
        generator?: string;
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
    export namespace Channel {
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
        function parseChannel(xmlTag: XML.XMLTag): Channel;
    }
    export default Channel;
}
declare module "Side" {
    /*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\
    
      RSS TypeScript Library
    
      Copyright (c) TypeScriptLibs and Contributors
    
      Licensed under the MIT License.
      You may not use this file except in compliance with the License.
      You can get a copy of the License at https://typescriptlibs.org/LICENSE.txt
    
    \*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/
    import Channel from "Channel";
    import * as XML from 'tsl-core-xml';
    /**
     *
     */
    export interface Side extends XML.XMLTag {
        /**
         * Side Channels with groups of information. Usually only one Channel in a
         * single language and topic can be found.
         */
        channels?: Array<Channel>;
        /**
         * Formal structure of the RSS Side.
         *
         * @see {@link Side.isAtomSide}
         * @see {@link Side.isRDFSide}
         * @see {@link Side.isRSSSide}
         */
        tag: ('feed' | 'rdf' | 'rss');
        /**
         * Semantic version number of the specifications for this RSS Side.
         */
        version?: string;
    }
    export namespace Side {
        /**
         * Tests an object or value for the Atom structure of the Side tag.
         *
         * @param obj
         * Unknown object or value to test.
         *
         * @return
         * `true`, if the object is structured like an Atom Side.
         */
        function isAtomSide(obj: unknown): obj is (Side & {
            tag: 'feed';
        });
        /**
         * Tests an object or value for the RDF structure of the Side tag.
         *
         * @param obj
         * Unknown object or value to test.
         *
         * @return
         * `true`, if the object is structured like an RDF Side.
         */
        function isRDFSide(obj: unknown): obj is (Side & {
            tag: 'rdf';
        });
        /**
         * Tests an object or value for the RSS structure of the Side tag.
         *
         * @param obj
         * Unknown object or value to test.
         *
         * @return
         * `true`, if the object is structured like an RSS Side.
         */
        function isRSSSide(obj: unknown): obj is (Side & {
            tag: 'rss';
        });
        /**
         * Tests an object or value for the structure of the Side tag.
         *
         * @param obj
         * Unknown object or value to test.
         *
         * @return
         * `true`, if the object is structured like the Side tag.
         */
        function isSide(obj: unknown): obj is Side;
        /**
         * Parses an RSS document.
         *
         * @param xml
         * The XML string or XML node(s) of the RSS document.
         *
         * @return
         * Returns the parsed Side tree of the RSS document.
         */
        function parseSide(xml: (string | XML.XMLNode | Array<XML.XMLNode>)): Side;
    }
    export default Side;
}
declare module "RSS" {
    /*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\
    
      RSS TypeScript Library
    
      Copyright (c) TypeScriptLibs and Contributors
    
      Licensed under the MIT License.
      You may not use this file except in compliance with the License.
      You can get a copy of the License at https://typescriptlibs.org/LICENSE.txt
    
    \*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/
    import Side from "Side";
    /**
     * Loads an RSS document from the given URL.
     *
     * @param url
     * The URL to load the RSS document from.
     *
     * @return
     * Returns a Promise of the parsed Side tree of the RSS document.
     */
    export function fetchRSS(url: (string | URL)): Promise<Side>;
    /**
     * Parses an RSS document.
     *
     * @param text
     * The text string of the RSS document.
     *
     * @return
     * Returns the parsed Side tree of the RSS document.
     */
    export function parseRSS(text: string): Side;
    const _default: {
        fetchRSS: typeof fetchRSS;
        parseRSS: typeof parseRSS;
    };
    export default _default;
}
declare module "index" {
    /*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\
    
      RSS TypeScript Library
    
      Copyright (c) TypeScriptLibs and Contributors
    
      Licensed under the MIT License.
      You may not use this file except in compliance with the License.
      You can get a copy of the License at https://typescriptlibs.org/LICENSE.txt
    
    \*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/
    import RSS from "RSS";
    export * from "Channel";
    export * from "Item";
    export * from "RSS";
    export * from "Side";
    export default RSS;
}
