import 'jest-extended';
import { search } from '../src/index';

test('should throw on invalid site', async () => {
	try {
		await search('asd123');
	} catch (error) {
		expect(error).toBeInstanceOf(Error);
		expect(error.message).toBe('This site is not supported.');
	}
});

test('should throw on non-string', async () => {
	try {
		// @ts-ignore
		await search(123);
	} catch (error) {
		expect(error).toBeInstanceOf(Error);
		expect(error.message).toBe('This site is not supported.');
	}
});

test('should throw on tags not being an array', async () => {
	try {
		// @ts-ignore
		await search('danbooru', { tags: 'test' });
	} catch (error) {
		expect(error).toBeInstanceOf(Error);
		expect(error.message).toBe('Tags have to be an array.');
	}
});

test('should throw on limit not being a number', async () => {
	try {
		// @ts-ignore
		await search('danbooru', { limit: {} });
	} catch (error) {
		expect(error).toBeInstanceOf(Error);
		expect(error.message).toBe('Limit has to be a number.');
	}
});
