import { LogOutputChannel, window } from 'vscode';
import { logString } from '../../../src/logger/logger';

describe('Tests for logging', () => {
    test('Test for logString()', () => {
        // Mock setup
        const channelMock = {
            name: 'LOG_CHANNEL',
            append: jest.fn(),
            appendLine: jest.fn(),
            replace: jest.fn(),
            clear: jest.fn(),
            show: jest.fn(),
            hide: jest.fn(),
            dispose: jest.fn(),
            LogOutputChannel: jest.fn(),
            onDidAppendLine: jest.fn(),
            logLevel: jest.fn(),
            onDidChangeLogLevel: jest.fn(),
            trace: jest.fn(),
            debug: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
            info: jest.fn()
        } as unknown as LogOutputChannel;
        jest.spyOn(window, 'createOutputChannel').mockImplementation(() => channelMock);

        // Test execution
        logString('LOG_MESSAGE');

        // Result check
        expect(channelMock.appendLine).toBeCalledWith('LOG_MESSAGE');
    });
});
