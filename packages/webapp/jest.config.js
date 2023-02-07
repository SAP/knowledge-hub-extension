module.exports = {
    displayName: 'knowledge-hub-extension-webapp',
    automock: false,
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{ts,tsx}'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/,<rootDir>/test/'],
    errorOnDeprecated: true,
    notify: false,
    notifyMode: 'failure',
    preset: 'ts-jest',
    setupFilesAfterEnv: ['./test/test-setup.js'],
    testEnvironment: 'jsdom',
    testMatch: ['**/test/**/*.(test).ts(x)?'],
    transform: {
        '^.+\\.(ts|tsx)?$': [
            'ts-jest',
            {
                jsx: 'react',
                diagnostics: {
                    warnOnly: true,
                    exclude: /\.(spec|test)\.ts$/
                }
            }
        ],
        '.+\\.(css|sass|scss)$': 'jest-css-modules-transform'
    },
    moduleNameMapper: {
        '.+\\.(svg)$': '<rootDir>/test/__mocks__/svgMock.ts',
        uuid: require.resolve('uuid')
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    verbose: false,
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
