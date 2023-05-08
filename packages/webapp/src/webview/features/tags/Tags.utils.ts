import { useRef } from 'react';
import { tagsAlphaRef } from '../../constants';

export const getTagsAlphaRef = () => {
    return tagsAlphaRef.map((alpha) => {
        return { label: alpha.label, value: alpha.value, ref: useRef<null | HTMLDivElement>(null) };
    });
};
