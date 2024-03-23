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
    enclosures?: Array<string>;
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
     * Returns the parsed Item of the RSS item (or Atom entry), or `undefined`.
     */
    export function parseItem (
        xmlTag: XML.XMLTag
    ): ( Item | undefined ) {

        if ( !isItem( xmlTag ) ) {
            return;
        }

        if ( !xmlTag.innerXML ) {
            return xmlTag;
        }

        for ( const xmlChild of xmlTag.innerXML ) {

            if ( !XML.isXMLTag( xmlChild ) ) {
                continue;
            }

            switch ( xmlChild.tag ) {
                case 'enclosure':
                case 'link':
                case 'source':
                    const link = (
                        xmlChild.attributes?.href ||
                        xmlChild.attributes?.url ||
                        xmlChild.innerXML?.join( ' ' ).trim()
                    );
                    if ( link ) {
                        if ( xmlChild.tag === 'enclosure' ) {
                            xmlTag.enclosures = xmlTag.enclosures || [];
                            xmlTag.enclosures.push( link );
                        }
                        else {
                            xmlTag[xmlChild.tag] = link;
                            if ( xmlChild.tag === 'link' ) {
                                xmlTag.guid = xmlTag.guid || xmlTag.link;
                            }
                        }
                    }
                    continue;
            }

            if ( xmlChild.innerXML ) {
                switch ( xmlChild.tag ) {
                    case 'author':
                    case 'comments':
                    case 'description':
                    case 'title':
                        xmlTag[xmlChild.tag] = xmlChild.innerXML.join( ' ' ).trim();
                        continue;
                    case 'category':
                        xmlTag.category = xmlTag.category || [];
                        xmlTag.category.push( xmlChild.innerXML.join( ' ' ).trim() );
                        continue;
                    case 'content':
                        xmlTag.content = xmlChild.innerXML.join( ' ' ).trim();
                        continue;
                    case 'guid':
                    case 'id':
                        xmlTag.guid = xmlChild.innerXML.join( ' ' ).trim();
                        continue;
                    case 'pubDate':
                    case 'published':
                        xmlTag.pubDate = new Date( Date.parse( xmlChild.innerXML.join( ' ' ).trim() ) );
                        xmlTag.upDate = xmlTag.upDate || xmlTag.pubDate;
                        continue;
                    case 'upDate':
                        xmlTag.upDate = new Date( Date.parse( xmlChild.innerXML.join( ' ' ).trim() ) );
                        continue;
                }
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


export default Item;
