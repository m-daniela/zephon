import { Component, ErrorInfo, ReactNode } from "react";

type Props = {
    children: ReactNode, 
    fallback: ReactNode
}

type State = {
    hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        console.log(error);
        return { hasError: true };
    }
    
    componentDidCatch(error: Error, info: ErrorInfo) {
        console.log(info, error);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return this.props.fallback;
        }
    
        return this.props.children;
    }
}
