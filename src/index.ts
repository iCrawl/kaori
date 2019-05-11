import fetch from 'node-fetch';
import { sites } from './sites';

import { Image } from './Image';

const VERSION = 2;

interface SearchRequest {
	tags: string[];
	limit: number;
	random: boolean;
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


export async function search(
	site: string,
	{ tags = [], limit = 1, random = false }: SearchRequest
): Promise<Image[]> {
	if (!Array.isArray(tags)) throw new Error('Tags have to be an array.');
	if (typeof limit !== 'number' && !Number.isNaN(limit)) throw new Error('Limit has to be a number.');
	const s = resolveSite(site);
	if (!s) throw new Error('This site is not supported.');
	const { endpoint, random: rand } = (sites as Sites)[s];
	if (random) {
		if (rand) tags.push('order:random');
	}

	const userAgent = `Kaori, a npm module for boorus. v${VERSION} (https://github.com/iCrawl/kaori/)`;
	const options = { headers: { 'User-Agent': userAgent } };

	try {
		const res = await fetch(`https://${s}${endpoint}tags=${tags.join('+')}&limit=${limit}`, options);
		const json = await res.json();
		return json.map((image: any) => new Image(image, s));
	} catch (error) {
		throw error;
	}
}
