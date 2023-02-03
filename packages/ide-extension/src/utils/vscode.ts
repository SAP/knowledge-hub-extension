import { Uri } from 'vscode';

/**
 * Convert a path to a resource uri.
 *
 * @param scriptDirectory a directory
 * @returns {string} a resource uri
 */
export function pathToResourceUri(scriptDirectory: string): string {
    return Uri.file(scriptDirectory).with({ scheme: 'vscode-resource' }).toString();
}

/**
 * Covert an uri to a resource uri.
 *
 * @param uri an URI
 * @returns {string} a resource uri
 */
export function uriToResourceUri(uri: Uri): string {
    return uri.with({ scheme: 'vscode-resource' }).toString();
}
