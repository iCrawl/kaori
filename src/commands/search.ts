import { CommandModule, Argv, Arguments } from 'yargs';
import { search } from '../index';

export class SearchCommand implements CommandModule {
	public command = 'search <site>';
	public describe = 'Searches boorus.';

	public builder(args: Argv): Argv {
		return args
			.option('t', {
				'alias': 'tags',
				'describe': 'The tags to search for',
				'type': 'array',
				'default': []
			})
			.option('l', {
				'alias': 'limit',
				'describe': 'The limit of images to return',
				'type': 'number',
				'default': 1
			})
			.option('r', {
				alias: 'random',
				describe: 'Whether or not to randomize the search',
				type: 'boolean'
			});
	}

	public async handler(args: Arguments): Promise<void> {
		const site = args.site as string;
		const tags = args.tags as string[];
		const limit = args.limit as number;
		const random = args.random as boolean;
		const s = await search(site, { tags, limit, random });
		console.log(s.map(image => image.fileURL).join('\n'));
	}
}
