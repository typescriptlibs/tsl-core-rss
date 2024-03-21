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


test( 'Test Side.parseSide with RSS 0.91 feed', ( assert: test.Assert ) => {
    const side = RSS.parseRSS( FS.readFileSync( 'tst-data/rss2a.xml', 'utf8' ) );

    assert.strictEqual(
        side.tag,
        'rss',
        'Side should be of RSS type.'
    );

    assert.strictEqual(
        side.version,
        '0.91',
        'Side should conain expected version.'
    );

    assert.strictEqual(
        side.channels?.length,
        1,
        'Side should contain the expected amount of channels.'
    );

} );


test( 'Test Side.parseSide with RSS 0.92 feed', ( assert: test.Assert ) => {
    const side = RSS.parseRSS( FS.readFileSync( 'tst-data/rss2b.xml', 'utf8' ) );

    assert.strictEqual(
        side.tag,
        'rss',
        'Side should be of RSS type.'
    );

    assert.strictEqual(
        side.version,
        '0.92',
        'Side should conain expected version.'
    );

    assert.strictEqual(
        side.channels?.length,
        1,
        'Side should contain the expected amount of channels.'
    );

} );


test( 'Test Side.parseSide with RSS 2.0 feed', ( assert: test.Assert ) => {
    const side = RSS.parseRSS( FS.readFileSync( 'tst-data/rss2c.xml', 'utf8' ) );

    assert.strictEqual(
        side.tag,
        'rss',
        'Side should be of RSS type.'
    );

    assert.strictEqual(
        side.version,
        '2.0',
        'Side should conain expected version.'
    );

    assert.strictEqual(
        side.channels?.length,
        1,
        'Side should contain the expected amount of channels.'
    );

} );
