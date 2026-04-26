import { useState } from 'react';
import { toPureNumber } from '../components/Helper';

export const useSubmit = ( wasmStatus ) => {
  const [outputLog, setOutputLog] = useState('');

  const onSubmit = async (data) => {
    // 1. Check if WASM is ready
    if (wasmStatus.state !== 'ready') {
      setOutputLog("Error: WASM is not yet initialized.");
      return;
    }

    // 2. Deep sanitize numerical fields for the backend
    const sanitizedOptions = data.options.map(opt => ({
      ...opt,
      rebate_amount: toPureNumber(opt.rebate_amount),
      cashback: toPureNumber(opt.cashback),
      down_payment: toPureNumber(opt.down_payment),
      nett_price: toPureNumber(opt.nett_price),
      loan_amount: toPureNumber(opt.loan_amount),
      monthly_instalment: toPureNumber(opt.monthly_instalment),
      other_discounts: opt.other_discounts.map(d => ({
        ...d,
        amount: toPureNumber(d.amount)
      }))
    }));

    const payload = {
      ...data,
      appointment_date: data.appointment_date ? new Date(data.appointment_date).toISOString() : "",
      quotation_validity: data.quotation_validity ? new Date(data.quotation_validity).toISOString() : "",
      project_details: {
        ...data.project_details,
        area_sqft: toPureNumber(data.project_details.area_sqft),
        spa_price: toPureNumber(data.project_details.spa_price),
      },
      legal_and_fees: {
        ...data.legal_and_fees,
        maintenance_fee_psf: toPureNumber(data.legal_and_fees.maintenance_fee_psf),
        maintenance_fee_total: toPureNumber(data.legal_and_fees.maintenance_fee_total),
        mot: toPureNumber(data.legal_and_fees.mot),
      },
      options: sanitizedOptions
    };

    setOutputLog("Generating...");
    console.log("Submitting Sanitized Payload:", payload);

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

        const leadName = data.lead_info.name || 'Document';
        const today = new Date().toISOString().split('T')[0];

        const link = document.createElement('a');
        link.href = url;
        link.download = `Quotation_${leadName}_${today}.pdf`; // Name of the file
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up the DOM
        
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
