import React from 'react';

const ProjectSpecificsSection = ({ register, watch }) => {

    const projectDetails = watch("project_details") || {};

    return (
        <section>
            <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Project Specifics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium">Tenure</label>
                    <input type="text" placeholder="e.g. Freehold" {...register("project_details.tenure")} className="w-full mt-1 p-2 border rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Unit No</label>
                    <input type="text" {...register("project_details.unit_no")} className="w-full mt-1 p-2 border rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Facing</label>
                    <input type="text" {...register("project_details.facing")} className="w-full mt-1 p-2 border rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Layout Type</label>
                    <input type="text" {...register("project_details.layout_type")} className="w-full mt-1 p-2 border rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Area (Sqft)</label>
                    <input type="number" {...register("project_details.area_sqft", { valueAsNumber: true })} className="w-full mt-1 p-2 border rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">SPA Price</label>
                    <input type="number" step="0.01" {...register("project_details.spa_price", { valueAsNumber: true })} className="w-full mt-1 p-2 border rounded" />
                </div>
            </div>
        </section>
    );

}

export default ProjectSpecificsSection;