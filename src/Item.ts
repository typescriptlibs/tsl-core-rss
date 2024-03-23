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
 *  Declarations
 *
 * */


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
    tag: ( 'entry' | 'item' );
    title?: string;
    upDate?: Date;
}


/* *
 *
 *  Namespace
 *
 * */


export namespace Item {


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
    export function isItem (
        obj: unknown
    ): obj is Item {
        return (
            XML.isXMLTag( obj ) &&
            (
                obj.tag === 'item' ||
                obj.tag === 'entry'
            )
        );
    }


    /**
     * Parses an RSS item (or Atom entry).
     *
     * @param xml
     * The XML tag to parse.
     *
     * @return
     * Returns the parsed Item of the RSS item (or Atom entry).
     */
    export function parseItem (
        xmlTag: XML.XMLTag
    ): Item {
        const item: Item = {
            tag: 'item'
        };

        if ( xmlTag.tag === 'entry' ) {
            item.tag = 'entry';
        }

        for ( const xmlChild of ( xmlTag.innerXML || [] ) ) {

            if ( !XML.isXMLTag( xmlChild ) ) {
                continue;
            }

            if ( xmlChild.attributes ) {
                switch ( xmlChild.tag ) {
                    case 'enclosure':
                    case 'source':
                        item[xmlChild.tag] = xmlChild.attributes.url;
                        continue;
                }
            }

            if ( xmlChild.innerXML ) {
                switch ( xmlChild.tag ) {
                    case 'author':
                    case 'comments':
                    case 'description':
                    case 'guid':
                    case 'title':
                        item[xmlChild.tag] = xmlChild.innerXML.join( ' ' ).trim();
                        continue;
                    case 'category':
                        item.category = item.category || [];
                        item.category.push( xmlChild.innerXML.join( ' ' ).trim() );
                        continue;
                    case 'content':
                    case 'content:encoded':
                        item.content = xmlChild.innerXML.join( ' ' ).trim();
                        continue;
                    case 'id':
                        item.guid = xmlChild.innerXML.join( ' ' ).trim();
                        continue;
                    case 'link':
                        item.link = xmlChild.innerXML.join( ' ' ).trim();
                        item.guid = item.guid || item.link;
                        continue;
                    case 'pubDate':
                    case 'published':
                        item.pubDate = new Date( Date.parse( xmlChild.innerXML.join( ' ' ).trim() ) );
                        item.upDate = item.upDate || item.pubDate;
                        continue;
                    case 'upDate':
                        item.upDate = new Date( Date.parse( xmlChild.innerXML.join( ' ' ).trim() ) );
                        continue;
                }
            }

        }

        return item;
    }


}


/* *
 *
 *  Default Export
 *
 * */


export default Item;
