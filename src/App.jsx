import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import TagInput from './components/TagInput';
import OptionPanel from './components/OptionPanel'
import { defaultOption, defaultValues } from "./components/Default"
import { getToday, getValidUntil } from "./components/Helper"
import { initWasm } from './hooks/Wasm';
import { useSubmit } from './hooks/Submit';
import PresetSection from './sections/Preset';
import GeneralInformationSection from './sections/GeneralInformation';
import ProjectSpecificsSection from './sections/ProjectSpecifics';

// --- MAIN APPLICATION ---
export default function App() {
  const wasmStatus = initWasm()
  const [activeTab, setActiveTab] = useState(0);

  const { onSubmit, outputLog } = useSubmit(wasmStatus);

  const { register, control, handleSubmit, watch } = useForm({
    defaultValues: defaultValues
  });

  const { fields: optionFields, append: addOption, remove: removeOption } = useFieldArray({
    control,
    name: "options"
  });

  const optionsWatcher = watch("options");

  const preventEnterSubmit = (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6 font-sans">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        
        {/* Header */}
        <div className="bg-blue-400 px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">{defaultValues.project_details.project_name} by {defaultValues.project_details.developer}</h1> 
          <br/>
          <h2 className="text-l font-bold text-white">{defaultValues.agent.name}</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={preventEnterSubmit} className="p-6 space-y-8">
          
          {/*<PresetSection register={register} watch={watch} /> */}

          {/* General Information */}
          <GeneralInformationSection register={register} />

          {/* Project Specifics */}
          <ProjectSpecificsSection register={register} watch={watch}/>

          {/* Legal & Maintenance Fees */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Legal & Maintenance Fees</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium">Maintenance Fee (PSF)</label>
                <input type="number" step="0.01" {...register("legal_and_fees.maintenance_fee_psf", { valueAsNumber: true })} className="w-full mt-1 p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium">Maintenance Fee (Total)</label>
                <input type="number" step="0.01" {...register("legal_and_fees.maintenance_fee_total", { valueAsNumber: true })} className="w-full mt-1 p-2 border rounded" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Included Fees (Type and Press Enter)</label>
                <Controller
                  control={control}
                  name="legal_and_fees.included"
                  render={({ field: { value, onChange } }) => (
                    <TagInput value={value} onChange={onChange} />
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Not Included Fees (Type and Press Enter)</label>
                <Controller
                  control={control}
                  name="legal_and_fees.not_included"
                  render={({ field: { value, onChange } }) => (
                    <TagInput value={value} onChange={onChange} />
                  )}
                />
              </div>
            </div>
          </section>

          {/* Quotation Options (Tabs) */}
          <section className="border rounded-lg overflow-hidden border-blue-200">
            <div className="bg-blue-50 px-4 py-3 flex items-center justify-between border-b border-blue-200">
              <h2 className="text-lg font-semibold text-blue-800">Quotation Options</h2>
              <button 
                type="button" 
                onClick={() => {
                  addOption({ ...defaultOption, option_name: `Option ${optionFields.length + 1}` });
                  setActiveTab(optionFields.length);
                }} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-sm rounded transition"
              >
                + Add Option
              </button>
            </div>
            
            {/* Tab Headers */}
            <div className="flex overflow-x-auto bg-gray-100 tab-scroll border-b border-gray-200">
              {optionFields.map((field, index) => (
                <button
                  key={field.id}
                  type="button"
                  onClick={() => setActiveTab(index)}
                  className={`px-4 py-3 text-sm font-medium border-r border-gray-200 focus:outline-none transition-colors whitespace-nowrap
                    ${activeTab === index 
                      ? 'bg-white text-blue-600 border-t-2 border-t-blue-600 border-b-white -mb-[1px]' 
                      : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  {optionsWatcher[index]?.option_name || `Option ${index + 1}`}
                </button>
              ))}
            </div>
            
            {/* Tab Content */}
            <div className="p-6 bg-white min-h-[400px]">
              {optionFields.map((field, index) => (
                <div key={field.id} className={activeTab === index ? 'block' : 'hidden'}>
                  <OptionPanel 
                    index={index} 
                    control={control} 
                    register={register} 
                    removeOption={(idx) => {
                      removeOption(idx);
                      setActiveTab(Math.max(0, idx - 1));
                    }} 
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Submission Area */}
          <div className="pt-6">
            <button 
              type="submit" 
              disabled={wasmStatus.state === 'loading'} 
              className={`w-full font-bold py-3 px-4 rounded text-lg transition shadow-md
                ${wasmStatus.state === 'loading' 
                  ? 'bg-gray-400 text-white cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'}`}
            >
              {wasmStatus.state === 'loading' ? 'Generate Quotation (Waiting for WASM)' : 'Generate Quotation'}
            </button>
          </div>
          
          {outputLog && (
            <pre className="mt-4 p-3 bg-gray-900 text-green-400 rounded text-sm overflow-x-auto whitespace-pre-wrap">
              {outputLog}
            </pre>
          )}

        </form>
      </div>
    </div>
  );
}