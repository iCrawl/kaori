import 'jest-extended';
import { search } from '../src/index';

test('fetching 1 image from danbooru', async () => {
	const s = await search('danbooru');
	s.map(image => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});

test('fetching 1 random image from danbooru', async () => {
	const s = await search('danbooru', { random: true });
	s.map(image => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});

test('fetching 1 random image from danbooru with tags', async () => {
	const s = await search('danbooru', { tags: ['cat'], random: true });
	s.map(image => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});

test('fetching 1 random image from danbooru with excluded tags', async () => {
	const s = await search('danbooru', { tags: ['cat'], exclude: ['maid'], random: true });
	s.map(image => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});

test('fetching 10 images from danbooru', async () => {
	const s = await search('danbooru', { limit: 10 });
	s.map(image => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});

test('fetching 10 random images from danbooru', async () => {
	const s = await search('danbooru', { limit: 10, random: true });
	s.map(image => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});

test('fetching 10 random images from danbooru with tags', async () => {
	const s = await search('danbooru', { tags: ['cat'], limit: 10, random: true });
	s.map(image => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});

test('fetching 10 random images from danbooru with excluded tags', async () => {
	const s = await search('danbooru', { tags: ['cat'], exclude: ['maid'], limit: 10, random: true });
	s.map(image => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});
