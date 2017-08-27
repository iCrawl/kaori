const Kaori = require('../index');
const kaori = new Kaori();

/* global test, expect */
test('Fetching 1 image from gelbooru', () => {
	kaori.search('gelbooru', { limit: 1 })
		.then(images => {
			expect(images[0].common.fileURL).toBeDefined();
			expect(images[0].common.id).toBeDefined();
			expect(images[0].common.tags).toBeDefined();
			expect(images[0].common.score).toBeDefined();
			expect(images[0].common.source).toBeDefined();
			expect(images[0].common.rating).toBeDefined();
		});
});

test('Fetching 1 random image from gelbooru', () => {
	kaori.search('gelbooru', { limit: 10, random: true })
		.then(images => {
			expect(images[0].common.fileURL).toBeDefined();
			expect(images[0].common.id).toBeDefined();
			expect(images[0].common.tags).toBeDefined();
			expect(images[0].common.score).toBeDefined();
			expect(images[0].common.source).toBeDefined();
			expect(images[0].common.rating).toBeDefined();
		});
});

test('Fetching 10 image from gelbooru', () => {
	kaori.search('gelbooru', { limit: 10 })
		.then(images => {
			expect(images[0].common.fileURL).toBeDefined();
			expect(images[0].common.id).toBeDefined();
			expect(images[0].common.tags).toBeDefined();
			expect(images[0].common.score).toBeDefined();
			expect(images[0].common.source).toBeDefined();
			expect(images[0].common.rating).toBeDefined();
		});
});

test('Fetching 10 random image from gelbooru', () => {
	kaori.search('gelbooru', { limit: 10, random: true })
		.then(images => {
			expect(images[0].common.fileURL).toBeDefined();
			expect(images[0].common.id).toBeDefined();
			expect(images[0].common.tags).toBeDefined();
			expect(images[0].common.score).toBeDefined();
			expect(images[0].common.source).toBeDefined();
			expect(images[0].common.rating).toBeDefined();
		});
});
