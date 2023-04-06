import type { WebviewPanel } from 'vscode';
import type { Storage } from '../utils/storage';

interface AppSessionProperties {
    storage: Storage;
    panel: WebviewPanel;
}

/**
 * AppSession is a singleton class that holds the state of the app.
 */
export class AppSession {
    // VSCode internal storage
    public storage: Storage;

    // VSCode Panel
    public panel: WebviewPanel;

    /**
     * Initializes class properties.
     *
     * @param {AppSessionProperties} properties - AppSession properties
     */
    constructor(properties: AppSessionProperties) {
        this.storage = properties.storage;
        this.panel = properties.panel;
    }
}
