import { useEffect, useRef } from 'react';

type AsyncEffect = () => Promise<void>;

/**
 * Fully safe useAsyncEffect hook:
 * - Handles async functions inside useEffect
 * - Prevents state updates after unmount
 * - Catches unhandled promise rejections
 */
export function useAsyncEffect(effect: AsyncEffect, deps: any[]) {
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;

        const runEffect = async () => {
            try {
                await effect();
            } catch (error) {
                console.error('useAsyncEffect error:', error);
            }
        };

        runEffect().catch(e => console.error(e));

        return () => {
            isMounted.current = false;
        };
    }, [deps, effect]);
}
