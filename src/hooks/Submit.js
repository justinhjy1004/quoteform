import { useState } from 'react';

export const useSubmit = (wasmStatus) => {
  const [outputLog, setOutputLog] = useState('');

  const onSubmit = async (data) => {
    // 1. Check if WASM is ready
    if (wasmStatus.state !== 'ready') {
      setOutputLog("Error: WASM is not yet initialized.");
      return;
    }

    // 2. Format dates to ISO as required by backend
    const payload = {
      ...data,
      appointment_date: data.appointment_date ? new Date(data.appointment_date).toISOString() : "",
      quotation_validity: data.quotation_validity ? new Date(data.quotation_validity).toISOString() : "",
    };

    setOutputLog("Generating...");
    console.log("Submitting Payload:", payload);

    try {
      if (typeof window.generatePDF === 'function') {
        const wasmResponse = await window.generatePDF(JSON.stringify(payload));
        
        let blob;
        // Handle Uint8Array or Base64 string responses
        if (wasmResponse instanceof Uint8Array) {
          blob = new Blob([wasmResponse], { type: 'application/pdf' });
        } else if (typeof wasmResponse === 'string' && wasmResponse.startsWith('JVBERi')) {
          const bChars = atob(wasmResponse);
          const bNums = new Uint8Array(bChars.length);
          for (let i = 0; i < bChars.length; i++) bNums[i] = bChars.charCodeAt(i);
          blob = new Blob([bNums], { type: 'application/pdf' });
        } else {
          throw new Error("Unexpected response format from WASM");
        }
        
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        setOutputLog("PDF Ready.");
      } else {
        setOutputLog("Simulation only: window.generatePDF is not defined.");
      }
    } catch (err) {
      setOutputLog("Error: " + err.message);
    }
  };

  return { onSubmit, outputLog, setOutputLog };
};