const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest', // Utilisation de Babel pour TS/JS
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/$1',
		
  },
  // Ajoute si ce n'est pas déjà présent
  moduleDirectories: ['node_modules', 'src'],
};

module.exports = createJestConfig(customJestConfig);
