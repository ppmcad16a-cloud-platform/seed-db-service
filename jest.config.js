// Jest config for the seed_db test suite.
module.exports = {
  testEnvironment: 'node',
  rootDir: '.',
  testMatch: ['<rootDir>/**/*.test.js'],
  testPathIgnorePatterns: ['/node_modules/'],
  globalSetup: '<rootDir>/tests/globalSetup.js',
  globalTeardown: '<rootDir>/tests/globalTeardown.js',
  setupFiles: ['<rootDir>/tests/setupEnv.js'],
  testTimeout: 30000,
  // Run Babel on faker ONLY (ESM-only since v10 - see babel.config.js).
  // Our own files must stay untouched: Babel would otherwise treat them as
  // ES modules and rewrite top-level `this` to undefined (models/user.js
  // relies on it).
  // ([\\/] matches both "/" (Linux CI) and "\" (Windows).)
  transform: { '[\\\\/]node_modules[\\\\/]@faker-js[\\\\/]faker[\\\\/].+\\.js$': 'babel-jest' },
  transformIgnorePatterns: ['[\\\\/]node_modules[\\\\/](?!@faker-js[\\\\/]faker[\\\\/])'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    '**/*.js',
    '!**/node_modules/**',
    '!coverage/**',
    '!tests/**',
    '!jest.config.js',
    '!babel.config.js',
    '!**/*.test.js'
  ],
  coverageThreshold: {
    global: {
      lines: 100
    }
  }
};
