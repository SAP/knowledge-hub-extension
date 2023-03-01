import type { TutorialsTags } from '@sap/knowledge-hub-extension-types';

interface OrderMap {
    [index: string]: number;
}

export interface SortedTagListEntry {
    title: string;
    tagId: string;
}

export const getAlternativeTitles = (val: string, tags: TutorialsTags): string[] | null => {
    if (tags && tags[val]) {
        return tags[val].tagAlternativeTitles;
    } else {
        return null;
    }
};

export const getTutorialsTag = (val: string, tags: TutorialsTags): string => {
    if (tags && tags[val]) {
        return tags[val].title;
    } else {
        return '';
    }
};

export const makeTutorialsTagCompare = (order: string) => {
    const ap = Array.prototype;
    const orderMap: OrderMap = {};
    const max = order.length + 2;

    ap.forEach.call(order, (char: string, idx: number) => {
        orderMap[char] = idx + 1;
    });

    const compareChars = (l: string, r: string): number => {
        const lOrder = orderMap[l] || max,
            rOrder = orderMap[r] || max;
        return lOrder - rOrder;
    };

    return (left: SortedTagListEntry, right: SortedTagListEntry): number => {
        const l = left.title.toLowerCase();
        const r = right.title.toLowerCase();

        const minLength = Math.min(l.length, r.length);
        const result: any = ap.reduce.call(
            l.substring(0, minLength),
            (prev, _, i: number) => {
                return prev || compareChars(l[i], r[i]);
            },
            0
        );

        return result || l.length - r.length;
    };
};
