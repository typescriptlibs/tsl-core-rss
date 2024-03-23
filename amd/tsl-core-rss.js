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
define("Image", ["require", "exports", "tsl-core-xml"], function (require, exports, XML) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Image = void 0;
    /* *
     *
     *  Namespace
     *
     * */
    var Image;
    (function (Image) {
        /**
         * Tests an object or value for the structure of the Image tag.
         *
         * @param obj
         * Unknown object or value to test.
         *
         * @return
         * `true`, if the object is structured like the Image tag.
         */
        function isImage(obj) {
            const image = obj;
            return (XML.isXMLTag(image) &&
                (image.tag === 'icon' ||
                    image.tag === 'image' ||
                    image.tag === 'logo') &&
                (typeof image.description === 'undefined' ||
                    typeof image.description === 'string') &&
                (typeof image.height === 'undefined' ||
                    typeof image.height === 'number') &&
                (typeof image.link === 'undefined' ||
                    typeof image.link === 'string') &&
                (typeof image.title === 'undefined' ||
                    typeof image.title === 'string') &&
                (typeof image.url === 'undefined' ||
                    typeof image.url === 'string') &&
                (typeof image.width === 'undefined' ||
                    typeof image.width === 'number'));
        }
        Image.isImage = isImage;
        /**
         * Parses an RSS channel image.
         *
         * @param xml
         * The XML tag to parse.
         *
         * @return
         * Returns the parsed Image tag of the RSS channel, or `undefined`.
         */
        function parseImage(xmlTag) {
            var _a;
            if (!isImage(xmlTag)) {
                return;
            }
            if (!xmlTag.innerXML) {
                return xmlTag;
            }
            if (xmlTag.tag !== 'image') {
                xmlTag.url = (_a = xmlTag.innerXML) === null || _a === void 0 ? void 0 : _a.join(' ').trim();
                return xmlTag;
            }
            for (const xmlChild of xmlTag.innerXML) {
                if (!XML.isXMLTag(xmlChild)) {
                    continue;
                }
                if (xmlChild.innerXML) {
                    switch (xmlChild.tag) {
                        case 'description':
                        case 'link':
                        case 'title':
                        case 'url':
                            xmlTag[xmlChild.tag] = xmlChild.innerXML.join(' ').trim();
                            continue;
                        case 'height':
                        case 'width':
                            xmlTag[xmlChild.tag] = parseFloat(xmlChild.innerXML.join(' ').trim());
                            continue;
                    }
                }
            }
            return xmlTag;
        }
        Image.parseImage = parseImage;
    })(Image || (exports.Image = Image = {}));
    /* *
     *
     *  Default Export
     *
     * */
    exports.default = Image;
});
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
         * Returns the parsed Item of the RSS item (or Atom entry), or `undefined`.
         */
        function parseItem(xmlTag) {
            var _a, _b, _c;
            if (!isItem(xmlTag)) {
                return;
            }
            if (!xmlTag.innerXML) {
                return xmlTag;
            }
            for (const xmlChild of xmlTag.innerXML) {
                if (!XML.isXMLTag(xmlChild)) {
                    continue;
                }
                switch (xmlChild.tag) {
                    case 'enclosure':
                    case 'link':
                    case 'source':
                        const link = (((_a = xmlChild.attributes) === null || _a === void 0 ? void 0 : _a.href) ||
                            ((_b = xmlChild.attributes) === null || _b === void 0 ? void 0 : _b.url) ||
                            ((_c = xmlChild.innerXML) === null || _c === void 0 ? void 0 : _c.join(' ').trim()));
                        if (link) {
                            if (xmlChild.tag === 'enclosure') {
                                xmlTag.enclosures = xmlTag.enclosures || [];
                                xmlTag.enclosures.push(link);
                            }
                            else {
                                xmlTag[xmlChild.tag] = link;
                                if (xmlChild.tag === 'link') {
                                    xmlTag.guid = xmlTag.guid || xmlTag.link;
                                }
                            }
                        }
                        continue;
                }
                if (xmlChild.innerXML) {
                    switch (xmlChild.tag) {
                        case 'author':
                        case 'comments':
                        case 'description':
                        case 'title':
                            xmlTag[xmlChild.tag] = xmlChild.innerXML.join(' ').trim();
                            continue;
                        case 'category':
                            xmlTag.category = xmlTag.category || [];
                            xmlTag.category.push(xmlChild.innerXML.join(' ').trim());
                            continue;
                        case 'content':
                            xmlTag.content = xmlChild.innerXML.join(' ').trim();
                            continue;
                        case 'guid':
                        case 'id':
                            xmlTag.guid = xmlChild.innerXML.join(' ').trim();
                            continue;
                        case 'pubDate':
                        case 'published':
                            xmlTag.pubDate = new Date(Date.parse(xmlChild.innerXML.join(' ').trim()));
                            xmlTag.upDate = xmlTag.upDate || xmlTag.pubDate;
                            continue;
                        case 'upDate':
                            xmlTag.upDate = new Date(Date.parse(xmlChild.innerXML.join(' ').trim()));
                            continue;
                    }
                }
            }
            return xmlTag;
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
define("Channel", ["require", "exports", "Image", "Item", "tsl-core-xml"], function (require, exports, Image_js_1, Item_js_1, XML) {
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
            var _a, _b, _c;
            if (!isChannel(xmlTag)) {
                return;
            }
            if (!xmlTag.innerXML) {
                return xmlTag;
            }
            let image;
            let item;
            for (const xmlChild of xmlTag.innerXML) {
                if (!XML.isXMLTag(xmlChild)) {
                    continue;
                }
                switch (xmlChild.tag) {
                    case 'cloud':
                        if (xmlChild.attributes) {
                            xmlTag.cloud = new URL(xmlChild.attributes.path, xmlChild.attributes.protocol + '://' +
                                xmlChild.attributes.domain + ':' +
                                xmlChild.attributes.port).href;
                        }
                        continue;
                    case 'entry':
                    case 'item':
                        item = Item_js_1.default.parseItem(xmlChild);
                        if (item) {
                            xmlTag.items = xmlTag.items || [];
                            xmlTag.items.push(item);
                        }
                        continue;
                    case 'image':
                    case 'logo':
                        image = Image_js_1.default.parseImage(xmlChild);
                        if (image) {
                            xmlTag.image = image;
                        }
                        continue;
                    case 'link':
                        if (((_a = xmlChild.attributes) === null || _a === void 0 ? void 0 : _a.rel) !== 'self') {
                            xmlTag.link = (((_b = xmlChild.innerXML) === null || _b === void 0 ? void 0 : _b.join(' ').trim()) ||
                                ((_c = xmlChild.attributes) === null || _c === void 0 ? void 0 : _c.url));
                        }
                        continue;
                }
                if (!xmlChild.innerXML) {
                    continue;
                }
                switch (xmlChild.tag) {
                    case 'copyright':
                    case 'description':
                    case 'docs':
                    case 'generator':
                    case 'managingEditor':
                    case 'subtitle':
                    case 'title':
                    case 'webMaster':
                        xmlTag[xmlChild.tag] = xmlChild.innerXML.join(' ').trim();
                        continue;
                    case 'language':
                        xmlTag[xmlChild.tag] = xmlChild.innerXML.join(' ').trim().toLowerCase();
                        continue;
                    case 'lastBuildDate':
                    case 'pubDate':
                        xmlTag[xmlChild.tag] = new Date(Date.parse(xmlChild.innerXML.join(' ').trim()));
                        continue;
                    case 'ttl':
                        xmlTag[xmlChild.tag] = parseFloat(xmlChild.innerXML.join(' ').trim());
                        continue;
                }
            }
            return xmlTag;
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
         * Returns the parsed Side tree of the RSS document, or `undefined`.
         */
        function parseSide(xml) {
            if (typeof xml === 'string') {
                xml = XML.XMLTree.parse(xml).roots;
            }
            if (!(xml instanceof Array)) {
                xml = [xml];
            }
            for (let xmlNode of xml) {
                if (!isSide(xmlNode)) {
                    continue;
                }
                if (xmlNode.attributes) {
                    for (const name in xmlNode.attributes) {
                        switch (name) {
                            case 'base':
                            case 'xml:base':
                                xmlNode.base = xmlNode.attributes[name];
                                continue;
                            case 'version':
                                xmlNode[name] = xmlNode.attributes[name];
                                continue;
                        }
                    }
                }
                if (!xmlNode.innerXML) {
                    return xmlNode;
                }
                let channel;
                for (const xmlChild of xmlNode.innerXML) {
                    if (!XML.isXMLTag(xmlChild)) {
                        continue;
                    }
                    channel = Channel_js_1.default.parseChannel(xmlChild);
                    if (channel) {
                        xmlNode.channels = xmlNode.channels || [];
                        xmlNode.channels.push(channel);
                    }
                }
                return xmlNode;
            }
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
     *
     * @throws
     * Throws the response, if not a valid RSS document.
     */
    async function fetchRSS(url) {
        const response = await fetch(url);
        const side = Side_js_1.default.parseSide(await response.text());
        if (!side) {
            throw response;
        }
        return side;
    }
    exports.fetchRSS = fetchRSS;
    /**
     * Parses an RSS document.
     *
     * @param text
     * The text string of the RSS document.
     *
     * @return
     * Returns the parsed Side tree of the RSS document, or `undefined`.
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