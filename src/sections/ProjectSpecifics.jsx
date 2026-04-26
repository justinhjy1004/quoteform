import React from 'react';
import { Controller } from 'react-hook-form';
import { layoutTypes } from '../Default';
import { formatNumber, parseNumber } from '../components/Helper';

const ProjectSpecificsSection = ({ register, watch, setValue, control }) => {

    const projectDetails = watch("project_details") || {};
    const layoutData = {
        "Type A": { area: 850, psf: 0.35 },
        "Type B": { area: 1000, psf: 0.35 },
        "Type C": { area: 1200, psf: 0.40 }
    };

    const handleLayoutChange = (e) => {
        const selectedLayout = e.target.value;
        const data = layoutData[selectedLayout];

        if (data) {
            setValue("project_details.area_sqft", data.area);
            setValue("legal_and_fees.maintenance_fee_psf", data.psf);
            setValue("legal_and_fees.maintenance_fee_total", data.area * data.psf);
        }
    };
    
    const layoutRegister = register("project_details.layout_type");

    return (
        <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Project Specifics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-l font-medium">Layout Type</label>
                       <select
                            name={layoutRegister.name}
                            ref={layoutRegister.ref}
                            onBlur={layoutRegister.onBlur}
                            onChange={(e) => {
                                layoutRegister.onChange(e); // Sync with Form State
                                handleLayoutChange(e);      // Trigger Population
                            }}
                            className="w-full mt-1 p-2 border rounded"
                        >                        <option value="">Select Layout Type</option>
                        {layoutTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label className="block text-l font-medium">Facing</label>
                    <input type="text" {...register("project_details.facing")} className="w-full mt-1 p-2 border rounded" />
                </div>
                <div>
                    <label className="block text-l font-medium">Unit No.</label>
                    <input type="text" {...register("project_details.unit_no")} className="w-full mt-1 p-2 border rounded" />
                </div>
                <div>
                    <label className="block text-l font-medium">Area (Sqft)</label>
                    <Controller
                        name="project_details.area_sqft"
                        control={control}
                        render={({ field: { value, onChange, onBlur } }) => (
                            <input
                                type="text"
                                value={formatNumber(value)}
                                onChange={(e) => onChange(parseNumber(e.target.value))}
                                onBlur={onBlur}
                                onFocus={(e) => e.target.select()}
                                readOnly
                                className="w-full mt-1 p-2 border rounded bg-gray-100 cursor-not-allowed"
                            />
                        )}
                    />
                </div>
                <div>
                    <label className="block text-l font-medium">Car Park Lot</label>
                    <input type="text" {...register("project_details.car_park_lot")} className="w-full mt-1 p-2 border rounded" />
                </div>
                <div>
                    <label className="block text-l font-medium">SPA Price</label>
                    <Controller
                        name="project_details.spa_price"
                        control={control}
                        render={({ field: { value, onChange, onBlur } }) => (
                            <input
                                type="text"
                                value={formatNumber(value)}
                                onChange={(e) => onChange(parseNumber(e.target.value))}
                                onBlur={onBlur}
                                onFocus={(e) => e.target.select()}
                                className="w-full mt-1 p-2 border rounded"
                            />
                        )}
                    />
                </div>
            </div>
        </section>
    );

}

export default ProjectSpecificsSection;