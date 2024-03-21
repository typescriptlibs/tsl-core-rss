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


import * as FS from 'node:fs';

import * as RSS from 'tsl-core-rss';

import test from '@typescriptlibs/tst';


/* *
 *
 *  Tests
 *
 * */


test( 'Test RSS.parseRSS with RSS 0.91 feed', ( assert: test.Assert ) => {
    const side = RSS.parseRSS( FS.readFileSync( 'tst-data/rss2a.xml', 'utf8' ) );

    assert.ok(
        RSS.Side.isRSSSide( side ),
        'RSS.parseRSS should return valid Side element.'
    );

} );


test( 'Test RSS.parseRSS with RSS 0.92 feed', ( assert: test.Assert ) => {
    const side = RSS.parseRSS( FS.readFileSync( 'tst-data/rss2b.xml', 'utf8' ) );

    assert.ok(
        RSS.Side.isRSSSide( side ),
        'RSS.parseRSS should return valid Side element.'
    );

} );


test( 'Test RSS.parseRSS with RSS 2.0 feed', ( assert: test.Assert ) => {
    const side = RSS.parseRSS( FS.readFileSync( 'tst-data/rss2c.xml', 'utf8' ) );

    assert.ok(
        RSS.Side.isRSSSide( side ),
        'RSS.parseRSS should return valid Side element.'
    );

} );
