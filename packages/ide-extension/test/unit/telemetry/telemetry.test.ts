import * as os from 'os';
import { workspace, ConfigurationChangeEvent, Disposable, ExtensionContext } from 'vscode';
import { initTelemetry, setCommonProperties, trackAction, trackEvent } from '../../../src/telemetry/telemetry';
import { LOG_TELEMETRY_EVENT } from '@sap/knowledge-hub-extension-types';
import type { TelemetryEvent, TelemetryReporter } from '../../../src/telemetry/types';
import packageJson from '../../../package.json';
import { KHUB_OPEN_BLOGS, KHUB_OPEN_TUTORIAL } from '../../../../types/dist/types';

jest.mock('applicationinsights', () => ({
    TelemetryClient: jest.fn().mockImplementation((key) => ({
        addTelemetryProcessor: jest.fn(),
        channel: { setUseDiskRetryCaching: jest.fn() },
        context: { tags: {}, keys: {} },
        key,
        trackEvent: jest.fn()
    }))
}));
jest.mock('os');
jest.spyOn(os, 'arch').mockImplementation(() => 'arch' as any);
jest.spyOn(os, 'platform').mockImplementation(() => 'platform' as any);
jest.spyOn(os, 'release').mockImplementation(() => '1.2.3release' as any);

describe('Test for initTelemetry()', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Init telemetry, enabled in config', () => {
        // Mock setup
        jest.spyOn(workspace, 'getConfiguration').mockReturnValue({ get: () => true } as any);

        // Test execution
        const reporter = initTelemetry();

        // Result check
        expect(reporter.enabled).toBe(true);
        expect(typeof reporter.dispose).toBe('function');
    });
});

describe('Telemetry disabled', () => {
    let reporter: TelemetryReporter;

    beforeEach(() => {
        jest.clearAllMocks();
        reporter = initTelemetry();
        reporter.enabled = false;
    });

    test('Track event when telemetry is disabled, should not send anything', () => {
        // Mock setup
        jest.spyOn(workspace, 'getConfiguration').mockReturnValue({ get: () => false } as any);

        // Test execution
        reporter = initTelemetry();
        trackEvent({ name: '', properties: {} } as unknown as TelemetryEvent);

        // Result check
        expect(reporter.client.trackEvent).not.toBeCalled();
    });

    test('Track action when telemetry is disabled, should not send anything', () => {
        // Mock setup
        jest.spyOn(workspace, 'getConfiguration').mockReturnValue({ get: () => false } as any);

        // Test execution
        reporter = initTelemetry();
        trackAction(getDummyAction(''));

        // Result check
        expect(reporter.client.trackEvent).not.toBeCalled();
    });

    test('Toggle telemetry setting', () => {
        // Mock setup
        let enabled = true;
        jest.spyOn(workspace, 'getConfiguration').mockReturnValue({ get: () => enabled } as any);

        // Test execution
        reporter = initTelemetry();
        trackEvent({ name: '', properties: {} } as unknown as TelemetryEvent);

        // Result check
        expect(reporter.enabled).toBe(false);
        expect(reporter.client.trackEvent).not.toBeCalled();

        // Enable telemetry
        reporter.enabled = true;
        let changeHandler: (e: ConfigurationChangeEvent) => any = () => { };
        jest.spyOn(workspace, 'onDidChangeConfiguration').mockImplementation(
            (listener: (e: ConfigurationChangeEvent) => any) => {
                changeHandler = listener;
                return {} as Disposable;
            }
        );
        reporter = initTelemetry();
        enabled = true;
        changeHandler({} as ConfigurationChangeEvent);

        // Test again
        trackEvent({ name: '', properties: {} } as unknown as TelemetryEvent);

        // Result check
        expect(reporter.enabled).toBe(true);
        expect(reporter.client.trackEvent).toBeCalled();
    });
    test('Track action when telemetry is enabled for logging tutorials', () => {
        // Test execution
        reporter = initTelemetry();
        reporter.enabled = true;
        trackAction(getDummyAction(''));

        // Result check
        expect(reporter.client.trackEvent).toBeCalled();
    });

    test('Track action when telemetry is enabled for logging blogs', () => {
        // Test execution
        reporter = initTelemetry();
        reporter.enabled = true;
        trackAction(getDummyAction1(''));

        // Result check
        expect(reporter.client.trackEvent).toBeCalledWith({
            name: 'sap-knowledge-hub-extension/USER_INTERACTION',
            properties: {
                action: 'OPEN_BLOG',
                primaryTag: 'abc-def-fgh',
                title: 'hello sap'
            }
        });
    });
});

describe('Test for setCommonProperties()', () => {
    let reporter: TelemetryReporter;

    beforeEach(() => {
        jest.clearAllMocks();
        if (reporter) {
            reporter.dispose();
        }
        reporter = initTelemetry();
    });

    test('Set common properties for VSCode, no release', () => {
        jest.spyOn(os, 'release').mockImplementation(() => undefined as any);
        setCommonProperties({ ide: 'VSCODE', sbasdevSpace: '' });
        expect(reporter.commonProperties).toEqual({
            'cmn.appstudio': 'false',
            'cmn.devspace': '',
            'common.os': 'platform',
            'common.nodeArch': 'arch',
            'common.platformversion': '',
            'common.extname': packageJson.name,
            'common.extversion': packageJson.version
        });
    });
});

/**
 *
 * @param _actionName
 */
function getDummyAction(_actionName: string): any {
    return {
        type: LOG_TELEMETRY_EVENT,
        payload: {
            action: {
                type: KHUB_OPEN_TUTORIAL,
                payload: {
                    action: 'OPEN_TUTORIAL',
                    title: 'hello sap',
                    primaryTag: 'abc-def-fgh'
                }
            } 
        }
    };
}

function getDummyAction1(_actionName: string): any {
    return {
        type: LOG_TELEMETRY_EVENT,
        payload: {
            action: {
                type: KHUB_OPEN_BLOGS,
                payload: {
                    action: 'OPEN_BLOG',
                    title: 'hello sap',
                    primaryTag: 'abc-def-fgh'
                }
            }
        }
    };
}
