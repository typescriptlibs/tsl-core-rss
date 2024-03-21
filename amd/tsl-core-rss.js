var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  RSS TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License.
  You may not use this file except in compliance with the License.
  You can get a copy of the License at https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/
define("Item", ["require", "exports", "tsl-core-xml"], function (require, exports, XML) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Item = void 0;
    /* *
     *
     *  Namespace
     *
     * */
    var Item;
    (function (Item) {
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Tests an object or value for the structure of the Item tag.
         *
         * @param obj
         * Unknown object or value to test.
         *
         * @return
         * `true`, if the object is structured like the Item tag.
         */
        function isItem(obj) {
            return (XML.isXMLTag(obj) &&
                (obj.tag === 'item' ||
                    obj.tag === 'entry'));
        }
        Item.isItem = isItem;
        /**
         * Parses an RSS item (or Atom entry).
         *
         * @param xml
         * The XML tag to parse.
         *
         * @return
         * Returns the parsed Item of the RSS item (or Atom entry).
         */
        function parseItem(xmlTag) {
            const item = {
                tag: 'item'
            };
            if (xmlTag.tag === 'entry') {
                item.tag = 'entry';
            }
            for (const xmlChild of (xmlTag.innerXML || [])) {
                if (!XML.isXMLTag(xmlChild)) {
                    continue;
                }
                if (xmlChild.attributes) {
                    switch (xmlChild.tag) {
                        case 'enclosure':
                        case 'source':
                            item.enclosure = xmlChild.attributes.url;
                            continue;
                    }
                }
                if (xmlChild.innerXML) {
                    switch (xmlChild.tag) {
                        case 'author':
                        case 'comments':
                        case 'description':
                        case 'guid':
                        case 'title':
                            item[xmlChild.tag] = xmlChild.innerXML.join(' ').trim();
                            continue;
                        case 'category':
                            item.category = item.category || [];
                            item.category.push(xmlChild.innerXML.join(' ').trim());
                            continue;
                        case 'content':
                        case 'content:encoded':
                            item.content = xmlChild.innerXML.join(' ').trim();
                            continue;
                        case 'id':
                            item.guid = xmlChild.innerXML.join(' ').trim();
                            continue;
                        case 'link':
                            item.link = xmlChild.innerXML.join(' ').trim();
                            item.guid = item.guid || item.link;
                            continue;
                        case 'pubDate':
                        case 'published':
                            item.pubDate = new Date(Date.parse(xmlChild.innerXML.join(' ').trim()));
                            item.upDate = item.upDate || item.pubDate;
                            continue;
                        case 'upDate':
                            item.upDate = new Date(Date.parse(xmlChild.innerXML.join(' ').trim()));
                            continue;
                    }
                }
            }
            return item;
        }
        Item.parseItem = parseItem;
    })(Item || (exports.Item = Item = {}));
    /* *
     *
     *  Default Export
     *
     * */
    exports.default = Item;
});
/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  RSS TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License.
  You may not use this file except in compliance with the License.
  You can get a copy of the License at https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/
define("Channel", ["require", "exports", "Item", "tsl-core-xml"], function (require, exports, Item_js_1, XML) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Channel = void 0;
    /* *
     *
     *  Namespace
     *
     * */
    var Channel;
    (function (Channel) {
        /**
         * Tests an object or value for the structure of the Channel tag.
         *
         * @param obj
         * Unknown object or value to test.
         *
         * @return
         * `true`, if the object is structured like the Channel tag.
         */
        function isChannel(obj) {
            const channel = obj;
            return (XML.isXMLTag(channel) &&
                (channel.tag === 'channel' ||
                    channel.tag === 'feed') &&
                (typeof channel.items === 'undefined' ||
                    channel.items instanceof Array &&
                        (!channel.items.length ||
                            Item_js_1.default.isItem(channel.items[0]))));
        }
        Channel.isChannel = isChannel;
        /**
         * Parses an RSS channel.
         *
         * @param xml
         * The XML tag to parse.
         *
         * @return
         * Returns the parsed Channel tree of the RSS channel.
         */
        function parseChannel(xmlTag) {
            const channel = {
                tag: 'channel'
            };
            if (xmlTag.tag === 'feed') {
                channel.tag === 'feed';
            }
            for (const xmlChild of (xmlTag.innerXML || [])) {
                if (!XML.isXMLTag(xmlChild)) {
                    continue;
                }
                if (Item_js_1.default.isItem(xmlChild)) {
                    channel.items = channel.items || [];
                    channel.items.push(Item_js_1.default.parseItem(xmlChild));
                    continue;
                }
                if (xmlChild.attributes) {
                    switch (xmlChild.tag) {
                        case 'cloud':
                            channel.cloud = new URL(xmlChild.attributes.path, xmlChild.attributes.protocol + '://' +
                                xmlChild.attributes.domain + ':' +
                                xmlChild.attributes.port);
                            continue;
                        case 'link':
                            channel.link = xmlChild.attributes.href;
                            continue;
                    }
                }
                if (xmlChild.innerXML) {
                    switch (xmlChild.tag) {
                        case 'copyright':
                        case 'description':
                        case 'docs':
                        case 'generator':
                        case 'link':
                        case 'managingEditor':
                        case 'subtitle':
                        case 'title':
                        case 'webMaster':
                            channel[xmlChild.tag] = xmlChild.innerXML.join(' ').trim();
                            continue;
                        case 'language':
                            channel[xmlChild.tag] = xmlChild.innerXML.join(' ').trim().toLowerCase();
                            continue;
                        case 'lastBuildDate':
                        case 'pubDate':
                            channel[xmlChild.tag] = new Date(Date.parse(xmlChild.innerXML.join(' ').trim()));
                            continue;
                        case 'ttl':
                            channel[xmlChild.tag] = parseFloat(xmlChild.innerXML.join(' ').trim());
                            continue;
                    }
                }
            }
            return channel;
        }
        Channel.parseChannel = parseChannel;
    })(Channel || (exports.Channel = Channel = {}));
    /* *
     *
     *  Default Export
     *
     * */
    exports.default = Channel;
});
/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  RSS TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License.
  You may not use this file except in compliance with the License.
  You can get a copy of the License at https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/
define("Side", ["require", "exports", "Channel", "tsl-core-xml"], function (require, exports, Channel_js_1, XML) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Side = void 0;
    /* *
     *
     *  Namespace
     *
     * */
    var Side;
    (function (Side) {
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Tests an object or value for the Atom structure of the Side tag.
         *
         * @param obj
         * Unknown object or value to test.
         *
         * @return
         * `true`, if the object is structured like an Atom Side.
         */
        function isAtomSide(obj) {
            var _a;
            return (XML.isXMLTag(obj) &&
                (obj.tag === 'feed' ||
                    obj.tag.endsWith(':feed') ||
                    ((_a = obj.attributes) === null || _a === void 0 ? void 0 : _a['xmlns']) === 'http://www.w3.org/2005/Atom'));
        }
        Side.isAtomSide = isAtomSide;
        /**
         * Tests an object or value for the RDF structure of the Side tag.
         *
         * @param obj
         * Unknown object or value to test.
         *
         * @return
         * `true`, if the object is structured like an RDF Side.
         */
        function isRDFSide(obj) {
            return (XML.isXMLTag(obj) &&
                (obj.tag === 'rdf' ||
                    obj.tag.endsWith(':RDF')));
        }
        Side.isRDFSide = isRDFSide;
        /**
         * Tests an object or value for the RSS structure of the Side tag.
         *
         * @param obj
         * Unknown object or value to test.
         *
         * @return
         * `true`, if the object is structured like an RSS Side.
         */
        function isRSSSide(obj) {
            var _a, _b;
            return (XML.isXMLTag(obj) &&
                (obj.tag === 'rss' ||
                    obj.tag.endsWith(':rss') ||
                    !!((_b = (_a = obj.attributes) === null || _a === void 0 ? void 0 : _a['xmlns']) === null || _b === void 0 ? void 0 : _b.startsWith('http://purl.org/rss/'))));
        }
        Side.isRSSSide = isRSSSide;
        /**
         * Tests an object or value for the structure of the Side tag.
         *
         * @param obj
         * Unknown object or value to test.
         *
         * @return
         * `true`, if the object is structured like the Side tag.
         */
        function isSide(obj) {
            return (isAtomSide(obj) ||
                isRDFSide(obj) ||
                isRSSSide(obj));
        }
        Side.isSide = isSide;
        /**
         * Parses an RSS document.
         *
         * @param xml
         * The XML string or XML node(s) of the RSS document.
         *
         * @return
         * Returns the parsed Side tree of the RSS document.
         */
        function parseSide(xml) {
            var _a;
            const side = {
                tag: 'rss'
            };
            if (typeof xml === 'string') {
                xml = XML.XMLTree.parse(xml).roots;
            }
            if (!(xml instanceof Array)) {
                xml = [xml];
            }
            for (const xmlNode of xml) {
                if (!isSide(xmlNode)) {
                    continue;
                }
                if ((_a = xmlNode.attributes) === null || _a === void 0 ? void 0 : _a.version) {
                    side.version = xmlNode.attributes.version;
                }
                if (xmlNode.tag === 'feed') {
                    side.channels = side.channels || [];
                    side.channels.push(Channel_js_1.default.parseChannel(xmlNode));
                    side.tag = 'feed';
                    continue;
                }
                for (const xmlChild of (xmlNode.innerXML || [])) {
                    if (!XML.isXMLTag(xmlChild)) {
                        continue;
                    }
                    if (Channel_js_1.default.isChannel(xmlChild)) {
                        side.channels = side.channels || [];
                        side.channels.push(Channel_js_1.default.parseChannel(xmlChild));
                    }
                }
            }
            return side;
        }
        Side.parseSide = parseSide;
    })(Side || (exports.Side = Side = {}));
    /* *
     *
     *  Default Export
     *
     * */
    exports.default = Side;
});
/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  RSS TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License.
  You may not use this file except in compliance with the License.
  You can get a copy of the License at https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/
define("RSS", ["require", "exports", "Side"], function (require, exports, Side_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseRSS = exports.fetchRSS = void 0;
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
    async function fetchRSS(url) {
        return Side_js_1.default.parseSide(await (await fetch(url)).text());
    }
    exports.fetchRSS = fetchRSS;
    /**
     * Parses an RSS document.
     *
     * @param text
     * The text string of the RSS document.
     *
     * @return
     * Returns the parsed Side tree of the RSS document.
     */
    function parseRSS(text) {
        return Side_js_1.default.parseSide(text);
    }
    exports.parseRSS = parseRSS;
    /* *
     *
     *  Default Export
     *
     * */
    exports.default = {
        fetchRSS,
        parseRSS
    };
});
/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  RSS TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License.
  You may not use this file except in compliance with the License.
  You can get a copy of the License at https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/
define("index", ["require", "exports", "RSS", "Channel", "Item", "RSS", "Side"], function (require, exports, RSS_js_1, Channel_js_2, Item_js_2, RSS_js_2, Side_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /* *
     *
     *  Exports
     *
     * */
    __exportStar(Channel_js_2, exports);
    __exportStar(Item_js_2, exports);
    __exportStar(RSS_js_2, exports);
    __exportStar(Side_js_2, exports);
    /* *
     *
     *  Default Export
     *
     * */
    exports.default = RSS_js_1.default;
});
//# sourceMappingURL=tsl-core-rss.js.map