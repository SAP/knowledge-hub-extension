import type { Tag } from '@sap/knowledge-hub-extension-types';

/**
 * Return a tag object from a tag id.
 *
 * @param {string} id The tag id to look for
 * @param {Tag[]} tags The list of all tags
 * @returns {Tag} A tag object
 */
export const getBlogsTagById = (id: string, tags: Tag[] | []): Tag => {
    let res = {
        displayName: '',
        guid: id
    };
    tags.forEach((tag: Tag) => {
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
