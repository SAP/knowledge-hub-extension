import { getBlogsTagById, isManagedTag } from '../../../src/webview/features/blogs/blogs.utils';

describe('Blogs.utils', () => {
    it('should test `getBlogsTagById`', () => {
        const tags = [
            {
                displayName: 'tag1',
                guid: 'tag1'
            },
            {
                displayName: 'tag2',
                guid: 'tag2'
            }
        ];
        const res = getBlogsTagById('tag1', tags);
        expect(res.displayName).toBe('tag1');
    });

    it('should test `isManagedTag`', () => {
        const tags = ['tag1', 'tag2'];
        const res = isManagedTag('tag1', tags);
        expect(res).toBe(true);
    });
});
