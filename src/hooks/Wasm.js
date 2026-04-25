import { useState, useEffect } from 'react';

export const initWasm = () => {
  const [wasmStatus, setWasmStatus] = useState({ 
    state: 'loading', 
    message: 'Initializing WASM...' 
  });

  useEffect(() => {
    let mounted = true;

    const initWASM = async () => {
      try {
        // Look for the Go glue code (usually loaded via a <script> tag in index.html)
        if (typeof window.Go !== 'undefined') {
          const go = new window.Go();
          const result = await WebAssembly.instantiateStreaming(
            fetch("/main.wasm"), 
            go.importObject
          );
          go.run(result.instance);
          
          if (mounted) setWasmStatus({ state: 'ready', message: 'WASM Ready' });
        } else {
          // Mock successful load for environment testing if Go isn't defined
          await new Promise(resolve => setTimeout(resolve, 800));
          if (mounted) setWasmStatus({ state: 'ready', message: 'WASM Ready (Mock)' });
        }
      } catch (err) {
        console.error("WASM Load Error:", err);
        if (mounted) setWasmStatus({ state: 'error', message: 'WASM Error' });
      }
    };

    initWASM();

    // Cleanup function: prevents setting state if the user leaves the page before WASM loads
    return () => {
      mounted = false;
    };
  }, []);

  return wasmStatus;
};