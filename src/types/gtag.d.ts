interface Window {
  gtag: (
    command: 'event',
    action: string,
    params: {
      error_type: string;
      error_message: string;
      stack_trace?: string;
      [key: string]: any;
    }
  ) => void;
} 