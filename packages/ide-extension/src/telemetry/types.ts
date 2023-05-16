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

export type TelemetryEvent =  TelemetryUIEvent;

interface TelemetryBaseEvent {
    name: string;
    properties?: TelemetryEventProperties;
}

export interface TelemetryCommonProperties extends TelemetryEventProperties {
    'cmn.appstudio': 'true' | 'false';
    'cmn.devspace': string;
    'cmn.os': string;
    'cmn.nodeArch': string;
    'cmn.platformversion': string;
    'cmn.extname': string;
    'cmn.extversion': string;
}

export interface TelemetryUIEvent extends TelemetryBaseEvent {
    name: 'KHUB_OPEN_TUTORIAL' | 'KHUB_OPEN_BLOGS';
    properties: TelemetryUIEventProps;
}

export interface TelemetryUIEventProps extends TelemetryEventProperties {
    action: string;
    [prop: string]: string;
}
