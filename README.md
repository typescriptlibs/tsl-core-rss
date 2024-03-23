RSS TypeScript Library
======================

This package provides simple ways to create and read RSS feeds. It supports any
format of RSS, RDF, and Atom. Unknown elements are passed through.



[![CodeQL](https://github.com/typescriptlibs/tsl-core-rss/workflows/CodeQL/badge.svg)](https://github.com/typescriptlibs/tsl-core-rss/actions/workflows/codeql.yml)
[![Node.js](https://github.com/typescriptlibs/tsl-core-rss/workflows/Node.js/badge.svg)](https://github.com/typescriptlibs/tsl-core-rss/actions/workflows/node.js.yml)
[![NPM](https://img.shields.io/npm/v/tsl-core-rss.svg)](https://www.npmjs.com/package/tsl-core-rss)
[![License](https://img.shields.io/npm/l/tsl-core-rss.svg)](https://github.com/typescriptlibs/tsl-core-rss/blob/main/LICENSE.md)



Example
-------

```ts
import RSS from 'tsl-core-rss';

RSS
    .fetchRSS('https://typescriptlibs.org/feed.xml')
    .then(side => console.log(side.channel.title));
    // TypeScriptLibs

```
