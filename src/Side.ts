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
 *  Declarations
 *
 * */


/**
 *
 */
export interface Side extends XML.XMLTag {


    /**
     * Base URL of the side. Used for relative links.
     */
    base?: string;


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
    tag: ( 'feed' | 'rdf' | 'rss' );


    /**
     * Semantic version number of the specifications for this RSS Side.
     */
    version?: string;


}


/* *
 *
 *  Namespace
 *
 * */


export namespace Side {


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
    export function isAtomSide (
        obj: unknown
    ): obj is ( Side & { tag: 'feed' } ) {
        return (
            XML.isXMLTag( obj ) &&
            (
                obj.tag === 'feed' ||
                obj.tag.endsWith( ':feed' ) ||
                obj.attributes?.['xmlns'] === 'http://www.w3.org/2005/Atom'
            )
        );
    }


    /**
     * Tests an object or value for the RDF structure of the Side tag.
     *
     * @param obj
     * Unknown object or value to test.
     *
     * @return
     * `true`, if the object is structured like an RDF Side.
     */
    export function isRDFSide (
        obj: unknown
    ): obj is ( Side & { tag: 'rdf' } ) {
        return (
            XML.isXMLTag( obj ) &&
            (
                obj.tag === 'rdf' ||
                obj.tag.endsWith( ':RDF' )
            )
        );
    }


    /**
     * Tests an object or value for the RSS structure of the Side tag.
     *
     * @param obj
     * Unknown object or value to test.
     *
     * @return
     * `true`, if the object is structured like an RSS Side.
     */
    export function isRSSSide (
        obj: unknown
    ): obj is ( Side & { tag: 'rss' } ) {
        return (
            XML.isXMLTag( obj ) &&
            (
                obj.tag === 'rss' ||
                obj.tag.endsWith( ':rss' ) ||
                !!obj.attributes?.['xmlns']?.startsWith( 'http://purl.org/rss/' )
            )
        );
    }


    /**
     * Tests an object or value for the structure of the Side tag.
     *
     * @param obj
     * Unknown object or value to test.
     *
     * @return
     * `true`, if the object is structured like the Side tag.
     */
    export function isSide (
        obj: unknown
    ): obj is Side {
        return (
            isAtomSide( obj ) ||
            isRDFSide( obj ) ||
            isRSSSide( obj )
        );
    }

    /**
     * Parses an RSS document.
     *
     * @param xml
     * The XML string or XML node(s) of the RSS document.
     *
     * @return
     * Returns the parsed Side tree of the RSS document, or `undefined`.
     */
    export function parseSide (
        xml: ( string | XML.XMLNode | Array<XML.XMLNode> )
    ): ( Side | undefined ) {

        if ( typeof xml === 'string' ) {
            xml = XML.XMLTree.parse( xml ).roots;
        }

        if ( !( xml instanceof Array ) ) {
            xml = [xml];
        }

        for ( let xmlNode of xml ) {

            if ( !isSide( xmlNode ) ) {
                continue;
            }

            if ( xmlNode.attributes ) {
                for ( const name in xmlNode.attributes ) {
                    switch ( name ) {
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

            if ( !xmlNode.innerXML ) {
                return xmlNode;
            }

            let channel: ( Channel | undefined );

            for ( const xmlChild of xmlNode.innerXML ) {

                if ( !XML.isXMLTag( xmlChild ) ) {
                    continue;
                }

                channel = Channel.parseChannel( xmlChild );

                if ( channel ) {
                    xmlNode.channels = xmlNode.channels || [];
                    xmlNode.channels.push( channel );
                }

            }

            return xmlNode;
        }

    }


}


/* *
 *
 *  Default Export
 *
 * */


export default Side;
