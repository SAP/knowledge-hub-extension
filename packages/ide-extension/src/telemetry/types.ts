import type { Disposable } from 'vscode';
import type { TelemetryClient } from 'applicationinsights';

export interface TelemetryReporter extends Disposable {
    client: TelemetryClient;
    commonProperties?: TelemetryCommonProperties;
    enabled: boolean;
}

export interface TelemetryEventProperties {
    readonly [key: string]: string;
}

export type TelemetryEvent = TelemetryUIEvent;

interface TelemetryBaseEvent {
    name: string;
    properties?: TelemetryEventProperties;
}

export interface TelemetryCommonProperties extends TelemetryEventProperties {
    'cmn.appstudio': 'true' | 'false';
    'cmn.devspace': string;
    'common.os': string;
    'common.nodeArch': string;
    'common.platformversion': string;
    'common.extname': string;
    'common.extversion': string;
}

export interface TelemetryUIEvent extends TelemetryBaseEvent {
    name: 'USER_INTERACTION';
    properties: TelemetryUIEventProps;
}

export interface TelemetryUIEventProps extends TelemetryEventProperties {
    action: string;
    [prop: string]: string;
}
