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


import Image from './Image.js';

import Item from './Item.js';

import * as XML from 'tsl-core-xml';


/* *
 *
 *  Declarations
 *
 * */


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
    tag: ( 'channel' | 'feed' );
    title?: string;
    ttl?: number;
    webMaster?: string;
}


/* *
 *
 *  Namespace
 *
 * */


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
    export function isChannel (
        obj: unknown
    ): obj is Channel {
        const channel = obj as Channel;

        return (
            XML.isXMLTag( channel ) &&
            (
                channel.tag === 'channel' ||
                channel.tag === 'feed'
            ) &&
            (
                typeof channel.items === 'undefined' ||
                channel.items instanceof Array &&
                (
                    !channel.items.length ||
                    Item.isItem( channel.items[0] )
                )
            )
        );
    }


    /**
     * Parses an RSS channel.
     *
     * @param xml
     * The XML tag to parse.
     *
     * @return
     * Returns the parsed Channel tree of the RSS channel.
     */
    export function parseChannel (
        xmlTag: XML.XMLTag
    ): ( Channel | undefined ) {

        if ( !isChannel( xmlTag ) ) {
            return;
        }

        if ( !xmlTag.innerXML ) {
            return xmlTag;
        }

        let image: ( Image | undefined );
        let item: ( Item | undefined );

        for ( const xmlChild of xmlTag.innerXML ) {

            if ( !XML.isXMLTag( xmlChild ) ) {
                continue;
            }

            switch ( xmlChild.tag ) {
                case 'cloud':
                    if ( xmlChild.attributes ) {
                        xmlTag.cloud = new URL(
                            xmlChild.attributes.path,
                            xmlChild.attributes.protocol + '://' +
                            xmlChild.attributes.domain + ':' +
                            xmlChild.attributes.port
                        ).href;
                    }
                    continue;
                case 'entry':
                case 'item':
                    item = Item.parseItem( xmlChild );
                    if ( item ) {
                        xmlTag.items = xmlTag.items || [];
                        xmlTag.items.push( item );
                    }
                    continue;
                case 'image':
                case 'logo':
                    image = Image.parseImage( xmlChild );
                    if ( image ) {
                        xmlTag.image = image;
                    }
                    continue;
                case 'link':
                    if ( xmlChild.attributes?.rel !== 'self' ) {
                        xmlTag.link = (
                            xmlChild.innerXML?.join( ' ' ).trim() ||
                            xmlChild.attributes?.url
                        );
                    }
                    continue;
            }

            if ( !xmlChild.innerXML ) {
                continue;
            }

            switch ( xmlChild.tag ) {
                case 'copyright':
                case 'description':
                case 'docs':
                case 'generator':
                case 'managingEditor':
                case 'subtitle':
                case 'title':
                case 'webMaster':
                    xmlTag[xmlChild.tag] = xmlChild.innerXML.join( ' ' ).trim();
                    continue;
                case 'language':
                    xmlTag[xmlChild.tag] = xmlChild.innerXML.join( ' ' ).trim().toLowerCase();
                    continue;
                case 'lastBuildDate':
                case 'pubDate':
                    xmlTag[xmlChild.tag] = new Date( Date.parse( xmlChild.innerXML.join( ' ' ).trim() ) );
                    continue;
                case 'ttl':
                    xmlTag[xmlChild.tag] = parseFloat( xmlChild.innerXML.join( ' ' ).trim() );
                    continue;
            }

        }

        return xmlTag;
    }


}


/* *
 *
 *  Default Export
 *
 * */


export default Channel;
