declare global {
  interface Window {
    turnstile?: {
      getResponse: (widgetIdOrContainer?: string | HTMLElement) => string | undefined;
      reset: (widgetIdOrContainer?: string | HTMLElement) => void;
    };
  }
}

export {};
