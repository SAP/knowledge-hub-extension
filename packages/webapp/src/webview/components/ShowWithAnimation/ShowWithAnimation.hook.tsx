import { useEffect, useState } from 'react';

export const useDelayUnmount = (isMounted: boolean, delayTime: number) => {
    const [showDiv, setShowDiv] = useState(false);
    useEffect(() => {
        let timeoutId: any;
        if (isMounted && !showDiv) {
            setShowDiv(true);
        } else if (!isMounted && showDiv) {
            timeoutId = setTimeout(() => setShowDiv(false), delayTime);
        }
        return () => clearTimeout(timeoutId);
    }, [isMounted, delayTime, showDiv]);
    return showDiv;
};
