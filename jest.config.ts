export default {
  preset: 'ts-jest',
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  testRegex: './*\\.(test|spec)\\.ts$',
  collectCoverageFrom: [
    "src/{!(database|joi|utils|middlewares|shared),}/*.ts"
  ],
  testTimeout: 18000,
  maxWorkers: 1,
};
