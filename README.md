# Kaori

> Your friendly neighbourhood violinist bringing you the best booru images

<div align="center">
	<a href="https://www.npmjs.com/package/kaori"><img src="https://img.shields.io/npm/v/kaori.svg?maxAge=3600" alt="NPM version" /></a>
	<a href="https://www.npmjs.com/package/kaori"><img src="https://img.shields.io/npm/dt/kaori.svg?maxAge=3600" alt="NPM downloads" /></a>
</div>

## Features

- Supports searching up to 11 boorus

## Install

```bash
npm i kaori
```

## Usage

#### Normal usage:

```js
import { search } from 'kaori';

const images = await search('danbooru', { tags: ['cat'], limit: 1, random: true });
images.map((image) => {
	console.log(image.fileURL);
});
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

**Kaori** © [iCrawl](https://github.com/iCrawl), Released under the [MIT](https://github.com/iCrawl/kaori/blob/master/LICENSE) License.  
Authored and maintained by iCrawl.

> GitHub [@iCrawl](https://github.com/iCrawl) · Twitter [@iCrawlToGo](https://twitter.com/iCrawlToGo)
