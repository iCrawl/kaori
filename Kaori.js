const fetch = require('node-fetch');
const { URL } = require('url');
const { Parser } = require('xml2js');
const parser = new Parser();

const sites = require('./sites');

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
			const endpoint = this.sites[site].endpoint;
			const options = { headers: { 'User-Agent': 'Kaori, an npm module for boorus.' } };
			if (!random) {
				return fetch(`http://${site}${endpoint}tags=${tags.join('+')}&limit=${limit}`, options)
					.then(res => {
						const contentType = res.headers.get('content-type').split(';');
						if (contentType.includes('text/xml')) return this._xml2json(res.text());
						else return res.json();
					})
					.then(images => resolve(this._commonify(images)))
					.catch(err => reject(new Error(`Couldn't fetch the api. ${err}`)));
			} else if (random && sites[site].random) {
				return fetch(`http://${site}${endpoint}tags=${tags.join('+')}+order:random&limit=${limit}`, options)
					.then(res => {
						const contentType = res.headers.get('content-type').split(';');
						if (contentType.includes('text/xml')) return this._xml2json(res.text());
						else return res.json();
					})
					.then(images => resolve(this._commonify(images)))
					.catch(err => reject(new Error(`Couldn't fetch the api. ${err}`)));
			} else {
				return fetch(`http://${site}${endpoint}tags=${tags.join('+')}&limit=100`, options)
					.then(res => {
						const contentType = res.headers.get('content-type').split(';');
						if (contentType.includes('text/xml')) return this._xml2json(res.text());
						else return res.json();
					})
					.then(parsed => this._shuffle(parsed))
					.then(shuffled => resolve(this._commonify(shuffled)))
					.catch(err => reject(new Error(`Couldn't fetch the api. ${err}`)));
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
			for (const image of Object.keys(images)) {
				const key = images[image];
				key.common = {
					fileURL: key.file_url.startsWith('/data')
						? `https://danbooru.donmai.us${key.file_url}`
						: !key.file_url.startsWith('http')
							? `https:${key.file_url}`
							: new URL(key.file_url).href,
					id: key.id.toString(),
					tags: typeof key.tags !== 'undefined'
						? key.tags.split(' ').filter(val => val !== '')
						: key.tag_string.split(' ').filter(val => val !== ''),
					score: parseInt(key.score),
					source: key.source,
					rating: key.rating
				};
			}
			return resolve(images);
		});
	}

	_shuffle(array) {
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
