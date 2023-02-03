import { pathToResourceUri, uriToResourceUri } from '../../../src/utils/vscode';
import { Uri } from 'vscode';
import { join } from 'path';

beforeEach(() => {
    jest.clearAllMocks();
});

const testDataFolder = '../samples/apps/';
const appFolder = 'v2lr4';
const root = join(testDataFolder, appFolder);
const uriRoot = Uri.file(root);

describe('utils', () => {
    describe('vscode', () => {
        test('pathToResourceUri', () => {
            const result = pathToResourceUri(root);
            expect(result).toEqual('vscode-resource:/../samples/apps/v2lr4');
        });

        test('uriToResurceUri', () => {
            const result = uriToResourceUri(uriRoot);
            expect(result).toEqual('vscode-resource:/../samples/apps/v2lr4');
        });
    });
});
