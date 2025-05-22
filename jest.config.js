module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],
    moduleDirectories: ['node_modules', '<rootDir>/'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
    transformIgnorePatterns: [
        '/node_modules/(?!(your-module-here))',
    ],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}; 