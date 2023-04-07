import { Storage } from '../../../src/utils/storage';
import type vscode from 'vscode';
import { FILTERS_BLOGS_TAGS, FILTERS_TUTORIALS_TAGS, BlogFiltersEntryType } from '@sap/knowledge-hub-extension-types';

const values: { [key: string]: unknown } = {};
const extensionContext: vscode.ExtensionContext = {
    globalState: {
        get: (key: string): unknown => {
            return values[key];
        },
        update: (key: string, value: unknown): void => {
            values[key] = value;
        }
    } as vscode.Memento
} as vscode.ExtensionContext;

describe('utils', () => {
    describe('Storage', () => {
        test('Property "appFilters" - value read and write', () => {
            let storage = new Storage(extensionContext.globalState, 'sap.ux.knowledgeHub.filters');
            // default
            expect(storage.appFilters).toEqual({
                [FILTERS_BLOGS_TAGS]: [],
                [FILTERS_TUTORIALS_TAGS]: []
            });

            // Write/change
            const tutorialsFilter = {
                tag: 'Tag1',
                title: 'Tag 1'
            };
            const blogsFilter = {
                id: 'Tag1',
                label: 'Tag 1',
                type: BlogFiltersEntryType.TAG
            };
            storage.setFilters(FILTERS_TUTORIALS_TAGS, [tutorialsFilter]);

            storage = new Storage(extensionContext.globalState, 'sap.ux.knowledgeHub.filters');
            expect(storage.appFilters).toEqual({
                [FILTERS_BLOGS_TAGS]: [],
                [FILTERS_TUTORIALS_TAGS]: [tutorialsFilter]
            });

            storage.setFilters(FILTERS_BLOGS_TAGS, [blogsFilter]);
            storage = new Storage(extensionContext.globalState, 'sap.ux.knowledgeHub.filters');
            expect(storage.appFilters).toEqual({
                [FILTERS_BLOGS_TAGS]: [blogsFilter],
                [FILTERS_TUTORIALS_TAGS]: [tutorialsFilter]
            });

            expect(storage.getTutorialsFilters()).toEqual([tutorialsFilter]);
            expect(storage.getBlogsFilters()).toEqual([blogsFilter]);
        });
    });
});
