/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  RSS TypeScript Library

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License.
  You may not use this file except in compliance with the License.
  You can get a copy of the License at https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/
import Channel from './Channel.js';
import * as XML from 'tsl-core-xml';
/**
 *
 */
export interface Side extends XML.XMLTag {
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
    tag: ('feed' | 'rdf' | 'rss');
    /**
     * Semantic version number of the specifications for this RSS Side.
     */
    version?: string;
}
export declare namespace Side {
    /**
     * Tests an object or value for the Atom structure of the Side tag.
     *
     * @param obj
     * Unknown object or value to test.
     *
     * @return
     * `true`, if the object is structured like an Atom Side.
     */
    function isAtomSide(obj: unknown): obj is (Side & {
        tag: 'feed';
    });
    /**
     * Tests an object or value for the RDF structure of the Side tag.
     *
     * @param obj
     * Unknown object or value to test.
     *
     * @return
     * `true`, if the object is structured like an RDF Side.
     */
    function isRDFSide(obj: unknown): obj is (Side & {
        tag: 'rdf';
    });
    /**
     * Tests an object or value for the RSS structure of the Side tag.
     *
     * @param obj
     * Unknown object or value to test.
     *
     * @return
     * `true`, if the object is structured like an RSS Side.
     */
    function isRSSSide(obj: unknown): obj is (Side & {
        tag: 'rss';
    });
    /**
     * Tests an object or value for the structure of the Side tag.
     *
     * @param obj
     * Unknown object or value to test.
     *
     * @return
     * `true`, if the object is structured like the Side tag.
     */
    function isSide(obj: unknown): obj is Side;
    /**
     * Parses an RSS document.
     *
     * @param xml
     * The XML string or XML node(s) of the RSS document.
     *
     * @return
     * Returns the parsed Side tree of the RSS document.
     */
    function parseSide(xml: (string | XML.XMLNode | Array<XML.XMLNode>)): Side;
}
export default Side;
