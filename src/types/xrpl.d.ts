declare global {
  interface Window {
    xrpl?: {
      connect: () => Promise<{ address: string }>;
      disconnect: () => Promise<void>;
      signTransaction: (tx: any) => Promise<any>;
      submitTransaction: (tx: any) => Promise<any>;
    };
  }
}

export {};
