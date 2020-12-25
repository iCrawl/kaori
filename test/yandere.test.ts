import 'jest-extended';
import { search } from '../src/index';

test('fetching 1 image from yandere', async () => {
	const s = await search('yandere');
	s.map((image) => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});

test('fetching 1 random image from yandere', async () => {
	const s = await search('yandere', { random: true });
	s.map((image) => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});

test('fetching 1 random image from yandere with tags', async () => {
	const s = await search('yandere', { tags: ['cat'], random: true });
	s.map((image) => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});

test('fetching 1 random image from yandere with excluded tags', async () => {
	const s = await search('yandere', { tags: ['cat'], exclude: ['maid'], random: true });
	s.map((image) => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});

test('fetching 10 images from yandere', async () => {
	const s = await search('yandere', { limit: 10 });
	s.map((image) => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});

test('fetching 10 random images from yandere', async () => {
	const s = await search('yandere', { limit: 10, random: true });
	s.map((image) => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});

test('fetching 10 random images from yandere with tags', async () => {
	const s = await search('yandere', { tags: ['cat'], limit: 10, random: true });
	s.map((image) => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});

test('fetching 10 random images from yandere with excluded tags', async () => {
	const s = await search('yandere', { tags: ['cat'], exclude: ['maid'], limit: 10, random: true });
	s.map((image) => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});
