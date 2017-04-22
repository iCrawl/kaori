/* eslint no-console: 0 */
const Kaori = require('../index');

const moreSites = require('./moreSites');

const kaori = new Kaori(moreSites);

kaori.search('e621', { tags: ['furry'], limit: 1, random: true })
	.then(images => console.log(images[0].common.fileURL))
	.catch(err => console.error(err));
