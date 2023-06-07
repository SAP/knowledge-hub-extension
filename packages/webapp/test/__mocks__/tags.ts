// Blogs

const tags = [
    { displayName: 'tag 1', guid: '1' },
    { displayName: 'tag 2', guid: '2' },
    { displayName: 'tag 3', guid: '3' },
    { displayName: 'tag 4', guid: '4' },
    { displayName: 'tag 5', guid: '5' }
];

export const tagsInitialState = {
    blogs: {
        data: {
            filteredTags: []
        },
        error: {
            isError: false,
            message: ''
        },
        pending: false
    },
    tutorials: {
        tags: {},
        error: {
            isError: false,
            message: ''
        },
        pending: false
    }
};

export const blogsTagsWithTags = {
    blogs: {
        data: {
            filteredTags: tags
        },
        error: {
            isError: false,
            message: ''
        },
        pending: false
    },
    tutorials: {
        tags: {},
        error: {
            isError: false,
            message: ''
        },
        pending: false
    }
};

export const blogsTagsWithNoDataWithPending = {
    blogs: {
        data: {
            filteredTags: []
        },
        error: {
            isError: false,
            message: ''
        },
        pending: true
    },
    tutorials: {
        tags: {},
        error: {
            isError: false,
            message: ''
        },
        pending: false
    }
};

export const blogsTagsWithNoDataWithError = {
    blogs: {
        data: {
            filteredTags: []
        },
        error: {
            isError: true,
            message: 'no internet'
        },
        pending: false
    },
    tutorials: {
        tags: {},
        error: {
            isError: false,
            message: ''
        },
        pending: false
    }
};

// Tutorials

export const tutorialsData = {
    group: '/group',
    mission: '/mission',
    facets: {
        Topic: [],
        Experience: ['Tag 1'],
        Type: ['Tag 2'],
        Software: ['Tag 3']
    },
    iconPath: {},
    tags: {
        'Tag 3': {
            tagAlternativeTitles: [],
            title: 'Test tag',
            tagTitle: 'Test tag'
        },
        'Tag 2': {
            tagAlternativeTitles: [],
            title: 'Group',
            tagTitle: 'tutorial:type/group'
        },
        'Tag 1': {
            tagAlternativeTitles: [],
            title: 'Beginner',
            tagTitle: 'tutorial:experience/beginner'
        }
    },
    tutorialsNewFrom: new Date(new Date().toISOString().split('T')[0]),
    result: [],
    numFound: 4,
    countGroups: 1,
    countMissions: 1,
    countTutorials: 1
};

export const tutorialsTagsWithTags = {
    blogs: {
        data: {
            filteredTags: []
        },
        error: {
            isError: false,
            message: ''
        },
        pending: false
    },
    tutorials: {
        tags: tutorialsData.tags,
        error: {
            isError: false,
            message: ''
        },
        pending: false
    }
};

export const tutorialsTagsWithNoDataWithPending = {
    blogs: {
        data: {
            filteredTags: []
        },
        error: {
            isError: false,
            message: ''
        },
        pending: false
    },
    tutorials: {
        tags: {},
        error: {
            isError: false,
            message: ''
        },
        pending: true
    }
};

export const tutorialsTagsWithNoDataWithError = {
    blogs: {
        data: {
            filteredTags: []
        },
        error: {
            isError: false,
            message: ''
        },
        pending: false
    },
    tutorials: {
        tags: {},
        error: {
            isError: true,
            message: 'no internet'
        },
        pending: false
    }
};
