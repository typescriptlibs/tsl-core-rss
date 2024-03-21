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
import Item from './Item.js';
import * as XML from 'tsl-core-xml';
/* *
 *
 *  Namespace
 *
 * */
export var Channel;
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
                        Item.isItem(channel.items[0]))));
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
            if (Item.isItem(xmlChild)) {
                channel.items = channel.items || [];
                channel.items.push(Item.parseItem(xmlChild));
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
})(Channel || (Channel = {}));
/* *
 *
 *  Default Export
 *
 * */
export default Channel;
