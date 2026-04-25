import React from "react";
import { Controller } from "react-hook-form";
import TagInput from "../components/TagInput";

const LegalAndMaintenanceSection = ({ register, control }) => {

    return (<section>
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Legal & Maintenance Fees</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-l font-medium">Maintenance Fee (PSF)</label>
                <input type="number" step="0.1" {...register("legal_and_fees.maintenance_fee_psf", { valueAsNumber: true })} className="w-full mt-1 p-2 border rounded" />
              </div>
              <div>
                <label className="block text-l font-medium">Maintenance Fee (Total)</label>
                <input type="number" step="10" {...register("legal_and_fees.maintenance_fee_total", { valueAsNumber: true })} className="w-full mt-1 p-2 border rounded" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-l font-medium mb-1">Included Fees (Type and Press Enter)</label>
                <Controller
                  control={control}
                  name="legal_and_fees.included"
                  render={({ field: { value, onChange } }) => (
                    <TagInput value={value} onChange={onChange} />
                  )}
                />
              </div>
              <div>
                <label className="block text-l font-medium mb-1">Not Included Fees (Type and Press Enter)</label>
                <Controller
                  control={control}
                  name="legal_and_fees.not_included"
                  render={({ field: { value, onChange } }) => (
                    <TagInput value={value} onChange={onChange} />
                  )}
                />
              </div>
            </div>
          </section>);
};

export default LegalAndMaintenanceSection;