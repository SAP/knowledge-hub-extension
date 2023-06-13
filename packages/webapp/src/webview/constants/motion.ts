export const MOTION_VARIANTS_PAGE = {
    initial: ({ direction }: { direction: 'forward' | 'backward' }) => ({
        opacity: direction === 'backward' ? 1 : 0,
        transition: {
            duration: 0.1,
            delay: 0
        }
    }),
    getIn: {
        opacity: 1,
        transition: {
            duration: 0.1,
            delay: 0
        }
    },
    getOut: ({ direction }: { direction: 'forward' | 'backward' }) => ({
        opacity: direction === 'backward' ? 0 : 1,
        transition: {
            duration: 0.1,
            delay: 0
        }
    })
};

export const MOTION_VARIANTS_MENU = {
    initial: ({ direction }: { direction: 'forward' | 'backward' }) => ({
        opacity: direction === 'backward' ? 1 : 0
    }),
    getIn: {
        opacity: 1
    },
    getOut: ({ direction }: { direction: 'forward' | 'backward' }) => ({
        opacity: direction === 'backward' ? 0 : 1
    })
};
