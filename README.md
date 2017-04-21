# Kaori
> Your friendly neighbourhood violinist bringing you the best booru images

<div align="center">
	<p>
		<a href="https://www.npmjs.com/package/kaori"><img src="https://img.shields.io/npm/v/kaori.svg?maxAge=3600" alt="NPM version" /></a>
		<a href="https://www.npmjs.com/package/kaori"><img src="https://img.shields.io/npm/dt/kaori.svg?maxAge=3600" alt="NPM downloads" /></a>
		<a href="https://david-dm.org/iCrawl/kaori"><img src="https://david-dm.org/iCrawl/kaori/status.svg?maxAge=3600" alt="Dependencies" /></a>
	</p>
	<p>
		<a href="https://nodei.co/npm/kaori/"><img src="https://nodei.co/npm/kaori.png?downloads=true&stars=true" alt="NPM info" /></a>
	</p>
</div>

## Features

- Currently supports searching up to 11 boorus with the ability to add custom ones
- Alias support
- Commonify; Adds a property to each image that will always have the same props no matter which booru you use
- Full promise support

## Install

```bash
npm install --save kaori
```

## Usage

#### Normal usage:

```js
const Kaori = require('kaori');
const kaori = new Kaori();

kaori.search('danbooru', { tags: ['cat'], limit: 1, random: true })
	.then(images => console.log(images[0].common.fileURL))
	.catch(err => console.error(err));
```

#### But you can also append your own sites to the already preexisting ones, as shown in the examples folder, as follows:

```js
const Kaori = require('kaori');

const moreSites = require('./moreSites');

const kaori = new Kaori(moreSites);

kaori.search('e621', { tags: ['furry'], limit: 1, random: true })
	.then(images => console.log(images[0].common.fileURL))
	.catch(err => console.error(err));
```

## Docs

#### kaori.search(site, options)
| Parameter | Type          | Optional | Default | Description |
|-----------|:-------------:|:--------:|:-------:|-------------|
| site      | string        |          | *none*  | The booru you want to search; supports aliases
| options   | searchOptions |    X     | {}      | Options for tags, amount of images, and if it should randomize

#### searchOptions ({ tags: [], limit: 1, random: false })
| Parameter | Type          | Optional | Default | Description |
|-----------|:-------------:|:--------:|:-------:|-------------|
| tags      | string[]      |    X     | []      | The tags to search the boorus with
| limit     | number        |    X     | 1       | The max amount of images
| random    | boolean       |    X     | false   | If the images should be randomized

#### Adding your own boorus

To make use of the functionality to add your own boorus you simple have to create a json file with following content:

```json
{
	"e621.net": {
		"aliases": ["e621"],
		"endpoint": "/post/index.json?",
		"random": true
	}
}
```

Require this json file and pass it the new instance of Kaori to apply the new sites to the already existing ones.
This will then allow you to call `kaori.search('e621.net')` or any alias you specified.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

**Kaori** © [iCrawl](https://github.com/iCrawl), Released under the [MIT](https://github.com/iCrawl/kaori/blob/master/LICENSE) License.<br>
Authored and maintained by iCrawl.

> GitHub [@iCrawl](https://github.com/iCrawl) · Twitter [@iCrawlToGo](https://twitter.com/iCrawlToGo)
