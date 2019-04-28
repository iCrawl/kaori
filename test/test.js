const { default: search } = require('../dist/index');

search('konachan', { tags: ['metroid'] })
	.then(res => console.log(res))
	.catch(err => console.error(err));
