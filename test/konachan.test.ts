import 'jest-extended';
import { search } from '../src/index';

test('fetching 1 image from konachan', async () => {
	const s = await search('konachan');
	s.map((image) => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});

test('fetching 1 random image from konachan', async () => {
	const s = await search('konachan', { random: true });
	s.map((image) => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});

test('fetching 1 random image from konachan with tags', async () => {
	const s = await search('konachan', { tags: ['cat'], random: true });
	s.map((image) => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});

test('fetching 1 random image from konachan with excluded tags', async () => {
	const s = await search('konachan', { tags: ['cat'], exclude: ['maid'], random: true });
	s.map((image) => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});

test('fetching 10 images from konachan', async () => {
	const s = await search('konachan', { limit: 10 });
	s.map((image) => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});

test('fetching 10 random images from konachan', async () => {
	const s = await search('konachan', { limit: 10, random: true });
	s.map((image) => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});

test('fetching 10 random images from konachan with tags', async () => {
	const s = await search('konachan', { tags: ['cat'], limit: 10, random: true });
	s.map((image) => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});

test('fetching 10 random images from konachan with excluded tags', async () => {
	const s = await search('konachan', { tags: ['cat'], exclude: ['maid'], limit: 10, random: true });
	s.map((image) => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});
