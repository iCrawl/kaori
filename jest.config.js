/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
	testMatch: ['<rootDir>/test/**/*.test.ts'],
	testEnvironment: 'node',
	collectCoverage: true,
	collectCoverageFrom: ['src/**/*.ts'],
	coverageDirectory: 'coverage',
	coverageReporters: ['text', 'lcov', 'clover'],
	setupFilesAfterEnv: ['jest-extended/all'],
};
