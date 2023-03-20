import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import type { Tag } from '@sap/knowledge-hub-extension-types';
import { initIcons } from '@sap-ux/ui-components';
import { initLCIcons } from '../../../src/webview/Icons/icons';

import { render } from '../../../test/__mocks__/store.mock';

import { TagsBlog } from '../../../src/webview/components/BlogCard/TagsBlog';

describe('BlogCard > TagsBlog', () => {
    // Initialize and register ui-components icons and specific icon to LC
    initIcons();
    initLCIcons();

    const renderTagsBlog = (tags: Tag[], callback: { (tag: Tag): void; (tags: Tag): void }): RenderResult =>
        render(<TagsBlog tags={tags} callback={callback} />);

    test('test if the TagsBlog text is rendered', () => {
        const tags = [
            {
                displayName: 'Test',
                guid: 'test'
            }
        ];
        const callbackfn = jest.fn();

        act(() => {
            renderTagsBlog(tags, callbackfn);
        });

        const tagsBlogTitleDOM = screen.getByText(/Test/i);
        expect(tagsBlogTitleDOM).toBeTruthy();

        if (tagsBlogTitleDOM) {
            act(() => {
                tagsBlogTitleDOM.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });
            expect(callbackfn).toHaveBeenCalledWith(tags[0]);

            act(() => {
                tagsBlogTitleDOM.dispatchEvent(new MouseEvent('keydown', { bubbles: true }));
            });
            expect(callbackfn).toHaveBeenCalledWith(tags[0]);
        }
    });
});
