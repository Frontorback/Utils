import { useCallback, useRef } from 'react';

export default function useDebounce(callback, delay) {
    const timer = useRef(null);
    return useCallback(
        (...args) => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
            timer.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay],
    );
}


export default function useThrottle(callback, delay) {
    const isThrottled = useRef(false);
    return useCallback(
        (...args) => {
            if (isThrottled.current) {
                return;
            }
            callback(...args);
            isThrottled.current = true;
            setTimeout(() => (isThrottled.current = false), delay);
        },
        [callback, delay],
    );
}
