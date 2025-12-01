const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testMatch: [
    '**/__tests__/**/*.test.js',
    '**/*.test.js',
  ],
  collectCoverageFrom: [
    'app/**/*.js',
    'components/**/*.js',
    'lib/**/*.js',
    '!app/api/**/*.js',
    '!**/*.config.js',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
  ],
};

module.exports = createJestConfig(customJestConfig);
