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
import Channel from './Channel.js';
import * as XML from 'tsl-core-xml';
/* *
 *
 *  Namespace
 *
 * */
export var Side;
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
                side.channels.push(Channel.parseChannel(xmlNode));
                side.tag = 'feed';
                continue;
            }
            for (const xmlChild of (xmlNode.innerXML || [])) {
                if (!XML.isXMLTag(xmlChild)) {
                    continue;
                }
                if (Channel.isChannel(xmlChild)) {
                    side.channels = side.channels || [];
                    side.channels.push(Channel.parseChannel(xmlChild));
                }
            }
        }
        return side;
    }
    Side.parseSide = parseSide;
})(Side || (Side = {}));
/* *
 *
 *  Default Export
 *
 * */
export default Side;
