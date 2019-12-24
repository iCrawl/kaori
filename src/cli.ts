#!/usr/bin/env node

import * as yargs from 'yargs';
import { SearchCommand } from './commands/search';

yargs
	.usage('Usage: $0 <command> [options]')
	.command(new SearchCommand())
	.recommendCommands()
	.strict()
	.alias('v', 'version')
	.help('h')
	.alias('h', 'help').argv;
