const tags = [
    { displayName: 'tag 1', guid: '1' },
    { displayName: 'tag 2', guid: '2' },
    { displayName: 'tag 3', guid: '3' },
    { displayName: 'tag 4', guid: '4' },
    { displayName: 'tag 5', guid: '5' }
];

export const tagsInitialState = {
    result: {
        data: {
            filteredTags: []
        },
        error: {
            isError: false,
            message: ''
        },
        pending: false
    }
};

export const tagsWithTags = {
    result: {
        data: {
            filteredTags: tags
        },
        error: {
            isError: false,
            message: ''
        },
        pending: false
    }
};

export const withNoDataWithPending = {
    result: {
        data: {
            filteredTags: []
        },
        error: {
            isError: false,
            message: ''
        },
        pending: true
    }
};

export const withNoDataWithError = {
    result: {
        data: {
            filteredTags: []
        },
        error: {
            isError: true,
            message: 'no internet'
        },
        pending: false
    }
};
