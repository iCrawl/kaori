module.exports = {
	roots: ['<rootDir>/test'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	setupFilesAfterEnv: ['jest-extended'],
	verbose: true,
};
