import { Component, ComponentChildren } from 'preact';
import React from 'preact/compat';

interface ErrorBoundaryProps {
    children: ComponentChildren;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: undefined };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: any): void {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render(props: ErrorBoundaryProps, state: ErrorBoundaryState): ComponentChildren {
        if (state.hasError) {
            return (
                <div>
                    <h1>Something went wrong.</h1>
                    {state.error && <p>{state.error.message}</p>}
                </div>
            );
        }

        return props.children;
    }
}

export default ErrorBoundary;
