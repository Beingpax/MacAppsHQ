/// <reference types="../types/gtag" />

export class ErrorTracker {
  private static instance: ErrorTracker;
  
  private constructor() {
    this.initializeErrorListeners();
  }

  static getInstance(): ErrorTracker {
    if (!ErrorTracker.instance) {
      ErrorTracker.instance = new ErrorTracker();
    }
    return ErrorTracker.instance;
  }

  private initializeErrorListeners() {
    window.addEventListener('error', (event) => {
      this.logError('Uncaught Error', event.error);
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.logError('Unhandled Promise Rejection', event.reason);
    });
  }

  private logError(type: string, error: Error | unknown) {
    console.error(`[${type}]`, error);
    
    // Only send to analytics if gtag is available
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'error', {
        error_type: type,
        error_message: error instanceof Error ? error.message : String(error),
        stack_trace: error instanceof Error ? error.stack : undefined
      });
    }
  }
} 