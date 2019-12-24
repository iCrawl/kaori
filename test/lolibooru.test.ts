import 'jest-extended';
import { search } from '../src/index';

test('fetching 1 image from lolibooru', async () => {
	const s = await search('lolibooru');
	s.map(image => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});

test('fetching 1 random image from lolibooru', async () => {
	const s = await search('lolibooru', { random: true });
	s.map(image => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});

test('fetching 1 random image from lolibooru with tags', async () => {
	const s = await search('lolibooru', { tags: ['cat'], random: true });
	s.map(image => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});

test('fetching 1 random image from lolibooru with excluded tags', async () => {
	const s = await search('lolibooru', { tags: ['cat'], exclude: ['maid'], random: true });
	s.map(image => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});

test('fetching 10 images from lolibooru', async () => {
	const s = await search('lolibooru', { limit: 10 });
	s.map(image => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});

test('fetching 10 random images from lolibooru', async () => {
	const s = await search('lolibooru', { limit: 10, random: true });
	s.map(image => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});

test('fetching 10 random images from lolibooru with tags', async () => {
	const s = await search('lolibooru', { tags: ['cat'], limit: 10, random: true });
	s.map(image => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});

test('fetching 10 random images from lolibooru with excluded tags', async () => {
	const s = await search('lolibooru', { tags: ['cat'], exclude: ['maid'], limit: 10, random: true });
	s.map(image => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});
