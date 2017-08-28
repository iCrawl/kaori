const fetch = require('node-fetch');
const url = require('url');
const { Parser } = require('xml2js');
const parser = new Parser();

const sites = require('./sites');
const { version } = require('../package');

class Kaori {
	constructor(customSites = {}) {
		this.sites = Object.assign(customSites, sites);
	}

	_resolveSite(resolvable) {
		if (typeof resolvable !== 'string') return false;
		resolvable = resolvable.toLowerCase();
		for (const site of Object.keys(this.sites)) {
			if (site === resolvable || this.sites[site].aliases.includes(resolvable)) return site;
		}
		return false;
	}

	search(site, { tags = [], limit = 1, random = false } = {}) {
		return new Promise((resolve, reject) => {
			if (!this._resolveSite(site)) return reject(new Error('This site is not supported.'));
			if (!(tags instanceof Array)) return reject(new Error('Tags have to be an Array.'));
			if (typeof limit !== 'number' && !Number.isNaN(limit)) return reject(new Error('Limit has to be a number.'));

			site = this._resolveSite(site);
			limit = parseInt(limit);
			return resolve(this._searchPosts(site, { tags, limit, random }));
		});
	}

	_searchPosts(site, { tags, limit, random }) {
		return new Promise((resolve, reject) => {
			const { endpoint } = this.sites[site];
			const userAgent = `Kaori, a npm module for boorus. v${version} (https://github.com/iCrawl/Kaori/)`;
			const options = { headers: { 'User-Agent': userAgent } };
			if (!random) {
				return fetch(`http://${site}${endpoint}tags=${tags.join('+')}&limit=${limit}`, options)
					.then(res => {
						const contentType = res.headers.get('content-type').split(';');
						if (contentType.includes('text/xml')) return res.text();
						else return res.json();
					})
					.then(images => resolve(this._commonify(images)))
					.catch(err => reject(new Error(`Couldn't fetch the API: ${err}`)));
			} else if (random && this.sites[site].random) {
				return fetch(`http://${site}${endpoint}tags=${tags.join('+')}+order:random&limit=${limit}`, options)
					.then(res => {
						const contentType = res.headers.get('content-type').split(';');
						if (contentType.includes('text/xml')) return res.text();
						else return res.json();
					})
					.then(images => resolve(this._commonify(images)))
					.catch(err => reject(new Error(`Couldn't fetch the API: ${err}`)));
			} else {
				return fetch(`http://${site}${endpoint}tags=${tags.join('+')}&limit=100`, options)
					.then(res => {
						const contentType = res.headers.get('content-type').split(';');
						if (contentType.includes('text/xml')) return res.text();
						else return res.json();
					})
					.then(parsed => this._commonify(parsed))
					.then(shuffled => resolve(this._shuffle(shuffled)))
					.catch(err => reject(new Error(`Couldn't fetch the API: ${err}`)));
			}
		});
	}

	_commonify(images) {
		return new Promise((resolve, reject) => {
			if (typeof images[0] === 'undefined') return reject(new Error('Commonify didn\'t recieve any images.'));
			return this._xml2json(images)
				.then(res => this._common(res))
				.then(image => resolve(image))
				.catch(error => reject(new Error(error)));
		});
	}

	_xml2json(images) {
		return new Promise((resolve, reject) => {
			if (typeof images !== 'object') {
				return parser.parseString(images, (err, res) => {
					if (err) return reject(new Error(err));
					if (typeof res.posts.post === 'undefined') return resolve([]);
					else return resolve(res.posts.post.map(val => val.$));
				});
			} else {
				return resolve(images);
			}
		});
	}

	_common(images) {
		return new Promise(resolve => {
			if (images === []) return resolve([]);
			images = images.filter(image => image.hasOwnProperty('file_url') || image.hasOwnProperty('image'));
			for (const image of Object.keys(images)) {
				const key = images[image];
				key.common = {
					fileURL: key.file_url.startsWith('/data') || key.file_url.startsWith('/cached') || key.image
						? `https://danbooru.donmai.us${key.file_url}`
						: !key.file_url.startsWith('http')
							? `https:${key.file_url}`
							: url.parse(key.file_url).href,
					id: key.id.toString(),
					tags: typeof key.tags !== 'undefined'
						? key.tags.split(' ').filter(val => val !== '')
						: key.tag_string.split(' ').filter(val => val !== ''),
					score: parseInt(key.score) || null,
					source: key.source || null,
					rating: key.rating || null
				};
			}
			return resolve(images);
		});
	}

	_shuffle(array) {
		array = array.slice();
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}
}

module.exports = Kaori;
