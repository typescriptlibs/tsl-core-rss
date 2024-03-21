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


test( 'Test Item.parseItem with RSS 0.91 feed', ( assert: test.Assert ) => {
    const side = RSS.parseRSS( FS.readFileSync( 'tst-data/rss2a.xml', 'utf8' ) );

    assert.strictEqual(
        side.channels?.length,
        1,
        'Side should contain one channel.'
    );

    const firstChannel = side.channels[0];

    assert.strictEqual(
        firstChannel.items?.length,
        6,
        'Side channel should contain the expected amount of items.'
    );

    const firstItem = firstChannel.items[0];

    assert.strictEqual(
        firstItem.title,
        'Giving the world a pluggable Gnutella',
        'Channel item should contain expected title.'
    );

    assert.strictEqual(
        firstItem.description,
        'WorldOS is a framework on which to build programs that work like Freenet or Gnutella -allowing distributed applications using peer-to-peer routing.',
        'Channel item should contain expected description.'
    );

    assert.strictEqual(
        firstItem.link,
        'http://writetheweb.com/read.php?item=24',
        'Channel item should contain expected link.'
    );

} );


test( 'Test Item.parseItem with RSS 0.92 feed', ( assert: test.Assert ) => {
    const side = RSS.parseRSS( FS.readFileSync( 'tst-data/rss2b.xml', 'utf8' ) );

    assert.strictEqual(
        side.channels?.length,
        1,
        'Side should contain one channel.'
    );

    const firstChannel = side.channels[0];

    assert.strictEqual(
        firstChannel.items?.length,
        22,
        'Side channel should contain the expected amount of items.'
    );

    const firstItem = firstChannel.items[0];

    assert.strictEqual(
        typeof firstItem.description,
        'string',
        'Channel item should contain a description.'
    );

    assert.strictEqual(
        firstItem.enclosure,
        'http://www.scripting.com/mp3s/weatherReportDicksPicsVol7.mp3',
        'Channel item should contain the expected media enclosure.'
    );

} );


test( 'Test Item.parseItem with RSS 2.0 feed', ( assert: test.Assert ) => {
    const side = RSS.parseRSS( FS.readFileSync( 'tst-data/rss2c.xml', 'utf8' ) );

    assert.strictEqual(
        side.channels?.length,
        1,
        'Side should contain one channel.'
    );

    const firstChannel = side.channels[0];

    assert.strictEqual(
        firstChannel.items?.length,
        4,
        'Side channel should contain the expected amount of items.'
    );

    const firstItem = firstChannel.items[0];

    assert.strictEqual(
        typeof firstItem.description,
        'string',
        'Channel item should contain a description.'
    );

    assert.strictEqual(
        firstItem.guid,
        'http://liftoff.msfc.nasa.gov/2003/06/03.html#item573',
        'Channel item should contain the expected GUID.'
    );

} );
