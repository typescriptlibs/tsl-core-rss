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


test( 'Test Channel.parseChannel with RSS 0.91 feed', ( assert: test.Assert ) => {
    const side = RSS.parseRSS( FS.readFileSync( 'tst-data/rss2a.xml', 'utf8' ) );

    assert.strictEqual(
        side.channels?.length,
        1,
        'Side should contain one channel.'
    );

    const firstChannel = side.channels[0];

    assert.strictEqual(
        firstChannel.title,
        'WriteTheWeb',
        'Side channel should have expected title.'
    );

    assert.strictEqual(
        firstChannel.language,
        'en-us',
        'Side channel should be of expected language.'
    );

    assert.strictEqual(
        firstChannel.link,
        'http://writetheweb.com',
        'Side channel should have expected link.'
    );

} );


test( 'Test Channel.parseChannel with RSS 0.92 feed', ( assert: test.Assert ) => {
    const side = RSS.parseRSS( FS.readFileSync( 'tst-data/rss2b.xml', 'utf8' ) );

    assert.strictEqual(
        side.channels?.length,
        1,
        'Side should contain one channel.'
    );

    const firstChannel = side.channels[0];

    assert.strictEqual(
        firstChannel.title,
        'Dave Winer: Grateful Dead',
        'Side channel should have expected title.'
    );

    assert.strictEqual(
        typeof firstChannel.description,
        'string',
        'Side channel should contain a description.'
    );

    assert.strictEqual(
        firstChannel.cloud?.href,
        'xml-rpc://data.ourfavoritesongs.com:80/RPC2',
        'Side channel should have expected cloud information.'
    );

} );


test( 'Test Channel.parseChannel with RSS 2.0 feed', ( assert: test.Assert ) => {
    const side = RSS.parseRSS( FS.readFileSync( 'tst-data/rss2c.xml', 'utf8' ) );

    assert.strictEqual(
        side.channels?.length,
        1,
        'Side should contain one channel.'
    );

    const firstChannel = side.channels[0];

    assert.strictEqual(
        firstChannel.description,
        'Liftoff to Space Exploration.',
        'Side channel should have the expected description.'
    );

    assert.strictEqual(
        firstChannel.docs,
        'http://blogs.law.harvard.edu/tech/rss',
        'Side channel should have the expected docs link.'
    );

    assert.strictEqual(
        firstChannel.language,
        'en-us',
        'Side channel should have the expected language information.'
    );

    assert.strictEqual(
        firstChannel.lastBuildDate?.toISOString(),
        ( new Date( Date.UTC( 2003, 5, 10, 9, 41, 1 ) ) ).toISOString(),
        'Side channel should have the expected build date.'
    );

    assert.strictEqual(
        firstChannel.link,
        'http://liftoff.msfc.nasa.gov/',
        'Side channel should have the expected link.'
    );

    assert.strictEqual(
        firstChannel.pubDate?.toISOString(),
        ( new Date( Date.UTC( 2003, 5, 10, 4 ) ) ).toISOString(),
        'Side channel should have the expected publish date.'
    );

    assert.strictEqual(
        firstChannel.title,
        'Liftoff News',
        'Side channel should have the expected title.'
    );

} );
