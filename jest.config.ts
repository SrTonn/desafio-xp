export default {
  preset: 'ts-jest',
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  testRegex: './*\\.test\\.ts$',
  testTimeout: 180000,
  maxWorkers: 1,
};
