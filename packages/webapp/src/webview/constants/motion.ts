export const MOTION_VARIANTS = {
    initial: ({ direction }: { direction: 'forward' | 'backward' }) => ({
        x: direction === 'backward' ? '-100%' : '100%',
        transition: {
            type: 'tween',
            duration: 0.2,
            delay: 0
        }
    }),
    getIn: {
        x: 0,
        transition: {
            type: 'tween',
            duration: 0.3,
            delay: 0
        }
    },
    getOut: ({ direction }: { direction: 'forward' | 'backward' }) => ({
        x: direction === 'backward' ? '100%' : '-100%',
        transition: {
            type: 'tween',
            duration: 0.3,
            delay: 0
        }
    })
};
