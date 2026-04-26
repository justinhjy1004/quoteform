import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import TagInput from "../components/TagInput";
import { calculateMOT } from "../components/Helper"

const StatusToggle = ({ label, name, register }) => (
  <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
    <label className="text-sm font-bold text-gray-700">{label}</label>
    <div className="inline-flex p-1 bg-gray-100 rounded-lg border border-gray-200">
      {/* FREE Option */}
      <label className="relative">
        <input
          type="radio"
          value="free"
          {...register(name)}
          className="peer sr-only"
        />
        <div className="px-4 py-1.5 rounded-md cursor-pointer transition-all 
          peer-checked:bg-white peer-checked:text-green-600 peer-checked:shadow-sm 
          text-gray-500 hover:text-gray-700 font-medium text-xs">
          FREE
        </div>
      </label>

      {/* NOT INCLUDED Option */}
      <label className="relative">
        <input
          type="radio"
          value="not_included"
          {...register(name)}
          className="peer sr-only"
        />
        <div className="px-4 py-1.5 rounded-md cursor-pointer transition-all 
          peer-checked:bg-white peer-checked:text-red-600 peer-checked:shadow-sm 
          text-gray-500 hover:text-gray-700 font-medium text-xs">
          NOT INCLUDED
        </div>
      </label>
    </div>
  </div>
);

const LegalAndMaintenanceSection = ({ register, watch, setValue }) => {

  const watchedPrice = watch("project_details.spa_price");
  const watchedCitizenship = watch("lead_info.citizenship");

  useEffect(() => {
    // 1. Sanitize the price input in case it comes through as a formatted string with commas
    const rawPrice = typeof watchedPrice === 'string' ? watchedPrice.replace(/,/g, '') : watchedPrice;
    const price = parseFloat(rawPrice) || 0;
    
    // 2. Ensure calculateMOT has a fallback so it never returns undefined or NaN
    const calculatedAmount = calculateMOT(price, watchedCitizenship) || 0;

    // Optional: Uncomment this to debug if the hook is firing properly
    console.log("Price:", price, "Citizenship:", watchedCitizenship, "Calculated MOT:", calculatedAmount);

    // 3. Add the options object to setValue to force the UI and form state to sync
    setValue("legal_and_fees.mot", calculatedAmount, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
    
  }, [watchedPrice, watchedCitizenship, setValue]);

  return (<section>
    <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Legal & Maintenance Fees</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-l font-medium">Maintenance Fee (PSF)</label>
        <input type="number" step="0.01" readOnly {...register("legal_and_fees.maintenance_fee_psf", { valueAsNumber: true })} onFocus={(e) => e.target.select()} className="w-full mt-1 p-2 border rounded bg-gray-100 cursor-not-allowed" />
      </div>
      <div>
        <label className="block text-l font-medium">Maintenance Fee (Total)</label>
        <input type="number" readOnly {...register("legal_and_fees.maintenance_fee_total", { valueAsNumber: true })} onFocus={(e) => e.target.select()} className="w-full mt-1 p-2 border rounded bg-gray-100 cursor-not-allowed" />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
      <div>
        <label className="block text-l font-medium">MOT Stamp Duty</label>
        <input type="number" {...register("legal_and_fees.mot", { valueAsNumber: true })} onFocus={(e) => e.target.select()} className="w-full mt-1 p-2 border rounded" />
      </div>
    </div>

    {/* TODO: CHANGE THIS LATER */}
    <StatusToggle label="SPA Legal Fee" name="legal_and_fees.spa_legal" register={register} />
    <StatusToggle label="SPA Disbursement Fees" name="legal_and_fees.spa_disbursement" register={register} />
    <StatusToggle label="Loan Agreement Fee" name="legal_and_fees.loan_agreement" register={register} />
    <StatusToggle label="Loan Disbursement Fee" name="legal_and_fees.loan_disbursement" register={register} />
    <StatusToggle label="Loan Stamp Duty" name="legal_and_fees.loan_stamp_duty" register={register} />

  </section>);
};

export default LegalAndMaintenanceSection;