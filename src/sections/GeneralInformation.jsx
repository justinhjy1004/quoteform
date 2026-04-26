import React from 'react';

const GeneralInformationSection = ({ register }) => {

    return (
        <section>
            <h2 className="text-xl font-semibold mb-4 text-black border-b border-black pb-2">
                General Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-l font-medium">Appointment Date</label>
                    <input type="date" required {...register("appointment_date")} className="w-full mt-1 p-2 border rounded" />
                </div>
                <div>
                    <label className="block text-l font-medium">Quotation Validity</label>
                    <input type="date" required {...register("quotation_validity")} className="w-full mt-1 p-2 border rounded" />
                </div>
                <div>
                    <label className="block text-l font-medium">Lead Name</label>
                    <input type="text" required {...register("lead_info.name")} className="w-full mt-1 p-2 border rounded" />
                </div>
                <div>
                    <label className="block text-l font-medium">Lead Contact</label>
                    <input type="text" required {...register("lead_info.contact")} className="w-full mt-1 p-2 border rounded" />
                </div>

                {/* Left-Labelled Segmented Control */}
                <div className="md:col-span-2 flex items-center justify-between bg-white p-2 rounded-lg">
                    <label className="block text-l font-medium"></label>
                    
                    <div className="flex items-center bg-gray-100 p-1 rounded-lg h-[42px] w-full max-w-[300px]">
                        {/* Malaysian Option */}
                        <label className="relative flex-1">
                            <input
                                type="radio"
                                value="Malaysian"
                                defaultChecked
                                {...register("lead_info.citizenship")}
                                className="peer sr-only"
                            />
                            <div className="px-4 py-1.5 rounded-md cursor-pointer transition-all text-center
                                peer-checked:bg-white peer-checked:text-blue-600 peer-checked:shadow-sm 
                                text-gray-500 hover:text-gray-700 font-medium text-l whitespace-nowrap">
                                Malaysian
                            </div>
                        </label>

                        {/* Non-Malaysian Option */}
                        <label className="relative flex-1">
                            <input
                                type="radio"
                                value="Non-Malaysian"
                                {...register("lead_info.citizenship")}
                                className="peer sr-only"
                            />
                            <div className="px-4 py-1.5 rounded-md cursor-pointer transition-all text-center
                                peer-checked:bg-white peer-checked:text-blue-600 peer-checked:shadow-sm 
                                text-gray-500 hover:text-gray-700 font-medium text-l whitespace-nowrap">
                                Non-Malaysian
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GeneralInformationSection;