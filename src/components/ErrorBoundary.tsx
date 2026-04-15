import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let errorMessage = "An unexpected error occurred.";
      
      try {
        // Check if it's a Firestore error JSON
        const firestoreError = JSON.parse(this.state.error?.message || "");
        if (firestoreError.error) {
          errorMessage = `Firestore Error: ${firestoreError.error} during ${firestoreError.operationType} at ${firestoreError.path || 'unknown path'}`;
        }
      } catch (e) {
        // Not a JSON error, use original message
        errorMessage = this.state.error?.message || errorMessage;
      }

      return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-background">
          <div className="max-w-md w-full glass p-10 rounded-[2rem] text-center border-destructive/20">
            <AlertCircle className="mx-auto text-destructive mb-6" size={48} />
            <h1 className="text-3xl font-black mb-4 uppercase tracking-tighter">Something went wrong</h1>
            <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
              {errorMessage}
            </p>
            <Button 
              onClick={() => window.location.reload()} 
              className="w-full h-14 rounded-xl gap-2 text-lg font-bold"
            >
              <RefreshCw size={20} /> Reload Application
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
