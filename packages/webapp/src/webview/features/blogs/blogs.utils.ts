import type { BlogsManagedTag } from '@sap/knowledge-hub-extension-types';

/**
 * Return a tag object from a tag id.
 *
 * @param {string} id The tag id to look for
 * @param {BlogsManagedTag[]} tags The list of all tags
 * @returns {BlogsManagedTag} A tag object
 */
export const getBlogsTagById = (id: string, tags: BlogsManagedTag[] | []): BlogsManagedTag => {
    let res = {
        displayName: '',
        guid: id
    };
    tags.forEach((tag: BlogsManagedTag) => {
        if (tag.guid === id) {
            res = tag;
        }
    });
    return res;
};

/**
 * Return true or false if tag id is in an array of tag.
 *
 * @param {string} tagId A tag id to look for
 * @param {string[]} tags A list of tags
 * @returns {boolean} true| false if tag is in tags
 */
export const isManagedTag = (tagId: string, tags: string[]): boolean => {
    return tags.includes(tagId);
};
