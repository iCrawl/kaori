import 'jest-extended';
import { search } from '../src/index';

test('fetching 1 image from tbib', async () => {
	const s = await search('tbib');
	s.map(image => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});

test('fetching 1 random image from tbib', async () => {
	const s = await search('tbib', { random: true });
	s.map(image => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});

test('fetching 10 images from tbib', async () => {
	const s = await search('tbib', { limit: 10 });
	s.map(image => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});

test('fetching 10 random images from tbib', async () => {
	const s = await search('tbib', { limit: 10, random: true });
	s.map(image => {
		expect(image.id).toBeNumber();
		expect(image.fileURL).toBeString();
		expect(image.tags).toBeArray();
		expect(image.score).toBeNumber();
	});
});
