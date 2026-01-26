import { Component, ReactNode, ErrorInfo } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, errorInfo: null };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({ error, errorInfo });
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
                    <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl w-full border border-red-200">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong 😭</h1>
                        <p className="text-gray-600 mb-6">The application encountered an error. Please try refreshing the page.</p>

                        <div className="bg-gray-100 p-4 rounded-lg overflow-auto mb-6 max-h-64">
                            <code className="text-sm font-mono text-red-800">
                                {this.state.error && this.state.error.toString()}
                            </code>
                            <br />
                            <br />
                            <code className="text-xs font-mono text-gray-500 whitespace-pre-wrap">
                                {this.state.errorInfo && this.state.errorInfo.componentStack}
                            </code>
                        </div>

                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
