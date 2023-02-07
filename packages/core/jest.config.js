module.exports = {
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.ts'],
    testPathIgnorePatterns: ['<rootDir>/dist'],
    verbose: true,
    coverageThreshold: {
        global: {
            branches: 30,
            functions: 28,
            lines: 35,
            statements: 35
        }
    },
    reporters: [
        'default',
        [
            'jest-sonar',
            {
                reportedFilePath: 'relative',
                relativeRootDir: '<rootDir>/../../../'
            }
        ]
    ]
};
