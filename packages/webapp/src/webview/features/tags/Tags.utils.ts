import { useRef } from 'react';
import type { Tags } from '@sap/knowledge-hub-extension-types';
import { store, actions } from '../../store';
import { tagsAlphaRef } from '../../constants';

export const getTagsAlphaRef = () => {
    return tagsAlphaRef.map((alpha) => {
        return { label: alpha.label, value: alpha.value, ref: useRef<null | HTMLDivElement>(null) };
    });
};

export const fetchTags = (): void => {
    const state = store.getState();
    const tagsState: Tags = state.tags;
    if (tagsState.result.data.filteredTags.length === 0) {
        actions.tagsFetchTags();
    }
};
