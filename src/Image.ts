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


export interface Image extends XML.XMLTag {
    description?: string;
    height?: number;
    link?: string;
    tag: ( 'icon' | 'image' | 'logo' );
    title?: string;
    url?: string;
    width?: number;
}


/* *
 *
 *  Namespace
 *
 * */


export namespace Image {


    /**
     * Tests an object or value for the structure of the Image tag.
     *
     * @param obj
     * Unknown object or value to test.
     *
     * @return
     * `true`, if the object is structured like the Image tag.
     */
    export function isImage (
        obj: unknown
    ): obj is Image {
        const image = obj as Image;

        return (
            XML.isXMLTag( image ) &&
            (
                image.tag === 'icon' ||
                image.tag === 'image' ||
                image.tag === 'logo'
            ) &&
            (
                typeof image.description === 'undefined' ||
                typeof image.description === 'string'
            ) &&
            (
                typeof image.height === 'undefined' ||
                typeof image.height === 'number'
            ) &&
            (
                typeof image.link === 'undefined' ||
                typeof image.link === 'string'
            ) &&
            (
                typeof image.title === 'undefined' ||
                typeof image.title === 'string'
            ) &&
            (
                typeof image.url === 'undefined' ||
                typeof image.url === 'string'
            ) &&
            (
                typeof image.width === 'undefined' ||
                typeof image.width === 'number'
            )
        );
    }


    /**
     * Parses an RSS channel image.
     *
     * @param xml
     * The XML tag to parse.
     *
     * @return
     * Returns the parsed Image tag of the RSS channel, or `undefined`.
     */
    export function parseImage (
        xmlTag: XML.XMLTag
    ): ( Image | undefined ) {

        if ( !isImage( xmlTag ) ) {
            return;
        }

        if ( !xmlTag.innerXML ) {
            return xmlTag;
        }

        if ( xmlTag.tag !== 'image' ) {
            xmlTag.url = xmlTag.innerXML?.join( ' ' ).trim();
            return xmlTag;
        }

        for ( const xmlChild of xmlTag.innerXML ) {

            if ( !XML.isXMLTag( xmlChild ) ) {
                continue;
            }

            if ( xmlChild.innerXML ) {
                switch ( xmlChild.tag ) {
                    case 'description':
                    case 'link':
                    case 'title':
                    case 'url':
                        xmlTag[xmlChild.tag] = xmlChild.innerXML.join( ' ' ).trim();
                        continue;
                    case 'height':
                    case 'width':
                        xmlTag[xmlChild.tag] = parseFloat( xmlChild.innerXML.join( ' ' ).trim() );
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


export default Image;
