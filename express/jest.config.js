module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  moduleFileExtensions: ['js', 'json', 'node'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testMatch: ['**/*.test.js'],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  setupFiles: ['dotenv/config'],
  testRunner: 'jest-circus/runner',
};
