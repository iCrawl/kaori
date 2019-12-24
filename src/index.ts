import fetch from 'node-fetch';
import { sites } from './sites';

import { Image } from './Image';

const VERSION = 2;

interface SearchRequest {
	tags?: string[];
	exclude?: string[];
	limit?: number;
	random?: boolean;
}

interface Sites {
	[key: string]: {
		aliases: string[];
		nsfw: boolean;
		endpoint: string;
		random: boolean;
	};
}

function resolveSite(resolvable: string): string | null {
	if (typeof resolvable !== 'string') return null;
	resolvable = resolvable.toLowerCase();
	for (const site of Object.keys(sites)) {
		if (site === resolvable || (sites as Sites)[site].aliases.includes(resolvable)) return site;
	}
	return null;
}

function shuffle<T>(array: T): T {
	if (!Array.isArray(array)) throw new TypeError(`Expected an Array, got ${typeof array} instead.`);
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const tmp = array[i];
		array[i] = array[j];
		array[j] = tmp;
	}
	return array;
}


export async function search(
	site: string,
	{ tags = [], exclude = [], limit = 1, random = false }: SearchRequest = { tags: [], exclude: [], limit: 1, random: false }
): Promise<Image[]> {
	if (!Array.isArray(tags)) throw new Error('Tags have to be an array.');
	if (typeof limit !== 'number' && !Number.isNaN(limit)) throw new Error('Limit has to be a number.');
	const s = resolveSite(site);
	if (!s) throw new Error('This site is not supported.');
	const { endpoint, random: rand } = (sites as Sites)[s];
	let rngLimit = 0;
	if (random) {
		if (rand) tags.push('order:random');
		else rngLimit = 100;
	}

	const userAgent = `Kaori, a npm module for boorus. v${VERSION} (https://github.com/iCrawl/kaori/)`;
	const options = { headers: { 'User-Agent': userAgent } };

	try {
		const res = await fetch(`https://${s}${endpoint}tags=${tags.join('+')}&limit=${rngLimit ? rngLimit : limit}`, options);
		const res2 = res.clone();
		const text = await res2.text();
		if (!text) throw new Error('Encountered empty response');
		const json = await res.json();
		if ('success' in json && !json.success) throw new Error(json.message);
		let images: Image[] = json.map((image: any) => new Image(image, s));
		if (rngLimit) {
			images = shuffle(images).slice(0, limit);
		}
		if (exclude.length) {
			const left = images.filter(image => image.tags.every(tag => !exclude.includes(tag)));
			return left;
		}
		return images;
	} catch (error) {
		throw error;
	}
}
