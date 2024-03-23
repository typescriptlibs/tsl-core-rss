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
import * as XML from 'tsl-core-xml';
/* *
 *
 *  Namespace
 *
 * */
export var Image;
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
})(Image || (Image = {}));
/* *
 *
 *  Default Export
 *
 * */
export default Image;
