import { useRef } from 'react';
import type { Tags } from '@sap/knowledge-hub-extension-types';
import { store, actions } from '../../store';
import { tagsAlphaRef } from '../../constants';

export const getTagsAlphaRef = () => {
    return tagsAlphaRef.map((alpha) => {
        return { label: alpha.label, value: alpha.value, ref: useRef<null | HTMLDivElement>(null) };
    });
};

export const fetchBlogsTags = (): void => {
    const state = store.getState();
    const tagsState: Tags = state.tags;
    if (tagsState.blogs.data.filteredTags.length === 0) {
        actions.tagsFetchBlogsTags();
    }
};

export const fetchTutorialsTags = (): void => {
    const state = store.getState();
    const tagsState: Tags = state.tags;
    if (Object.keys(tagsState.tutorials.tags).length === 0 && tagsState.tutorials.tags.constructor === Object) {
        actions.tagsFetchTutorialsTags();
    }
};
