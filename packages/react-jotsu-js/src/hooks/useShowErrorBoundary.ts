import {useState} from 'react';

export function useShowErrorBoundary() {
    const [error, setError] = useState<any>();
    if (error) {
        throw error;
    }

    return {
        showBoundary: setError
    };
}
