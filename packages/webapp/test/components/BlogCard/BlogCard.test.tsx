import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';

import type { BlogsSearchResultContentItem, Tag } from '@sap/knowledge-hub-extension-types';

import { initIcons } from '@sap-ux/ui-components';

import { blogEntry } from '../../../test/__mocks__/blogs';
import { render } from '../../../test/__mocks__/store.mock';

import { BlogCard } from '../../../src/webview/components/BlogCard';

describe('BlogCard', () => {
    // Initialize and register ui-components icons and specific icon to LC
    initIcons();

    const renderBlogCard = (
        blog: BlogsSearchResultContentItem,
        loading: boolean,
        onSelectedTag: { (tag: Tag): void; (tag: Tag): void }
    ): RenderResult => render(<BlogCard blog={blog} loading={loading} onSelectedTag={onSelectedTag} />);

    test('test if the BlogCard render is ok', () => {
        const blog = blogEntry[0];
        const loading = false;
        const onSelectedTag = jest.fn();
        renderBlogCard(blog, loading, onSelectedTag);

        screen.debug();

        const authorNameDOM = screen.getByText(/John Doe/i);
        expect(authorNameDOM.className).toEqual('blog-card-data-header-author');
    });
});
