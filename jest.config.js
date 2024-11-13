module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',  // Set the root directory to 'src'
  moduleDirectories: ['node_modules', 'src'],  // Add 'src' to moduleDirectories for resolving modules
  testMatch: ['**/?(*.)+(spec|test).ts'],  // Adjust test file pattern if needed
};
