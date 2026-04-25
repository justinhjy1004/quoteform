import React from 'react';

const GeneralInformationSection = ({ register }) => {

    return (<section>
        <h2 className="text-lg font-semibold mb-4 text-black border-b border-black pb-2">
            General Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium">Appointment Date</label>
                <input type="date" required {...register("appointment_date")} className="w-full mt-1 p-2 border rounded" />
            </div>
            <div>
                <label className="block text-sm font-medium">Quotation Validity</label>
                <input type="date" required {...register("quotation_validity")} className="w-full mt-1 p-2 border rounded" />
            </div>
            <div>
                <label className="block text-sm font-medium">Lead Name</label>
                <input type="text" required {...register("lead_info.name")} className="w-full mt-1 p-2 border rounded" />
            </div>
            <div>
                <label className="block text-sm font-medium">Lead Contact</label>
                <input type="text" required {...register("lead_info.contact")} className="w-full mt-1 p-2 border rounded" />
            </div>
        </div>
    </section>);

};

export default GeneralInformationSection;