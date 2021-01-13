module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [
    '<rootDir>/src/__tests__/'
  ],
  testMatch: [
    '**/*.test.ts'
  ]
};