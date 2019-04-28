import fetch from 'node-fetch';
import sites from './sites';

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


export default async function search(
	site: string,
	{ tags = [], limit = 1, random = false }: SearchRequest
): Promise<any> {
	const s = resolveSite(site);
	const { endpoint, random: rand } = (sites as Sites)[s!];
	if (random) {
		if (rand) tags.push('order:random');
	}

	try {
		const res = await fetch(`https://${s}${endpoint}tags=${tags.join('+')}&limit=${limit}`);
		return res.json();
	} catch (error) {
		throw error;
	}
}
