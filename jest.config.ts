export default {
  preset: 'ts-jest',
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  testRegex: './*\\.test\\.ts$',
  collectCoverageFrom: [
    "src/{!(database|joi|utils|middlewares|shared),}/*.ts"
  ],
  testTimeout: 180000,
  maxWorkers: 1,
};
