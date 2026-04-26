import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import TagInput from './components/TagInput';
import OptionPanel from './components/OptionPanel'
import { defaultOption, defaultValues } from "./Default"
import { getToday, getValidUntil } from "./components/Helper"
import { initWasm } from './hooks/Wasm';
import { useSubmit } from './hooks/Submit';
import PresetSection from './sections/Preset';
import GeneralInformationSection from './sections/GeneralInformation';
import ProjectSpecificsSection from './sections/ProjectSpecifics';
import LegalAndMaintenanceSection from './sections/LegalAndMaintenance';
import OptionsSection from './sections/Options';
import GenerateQuoteButton from './sections/GenerateQuotationButton';

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
          <h3 className="text-sm text-white">{defaultValues.project_details.tenure}</h3>
          <br />
          <h2 className="text-l font-bold text-white">{defaultValues.agent.name}</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={preventEnterSubmit} className="p-6 space-y-8">

          {/*<PresetSection register={register} watch={watch} /> */}

          {/* General Information */}
          <GeneralInformationSection register={register} />

          {/* Project Specifics */}
          <ProjectSpecificsSection register={register} watch={watch} />


          {/* Options Section */}
          <OptionsSection register={register} control={control} activeTab={activeTab} setActiveTab={setActiveTab} optionFields={optionFields} addOption={addOption} removeOption={removeOption} optionsWatcher={optionsWatcher} />

          {/* Legal & Maintenance Fees */}
          <LegalAndMaintenanceSection register={register} control={control} />

          {/* Submission Button */}
          <GenerateQuoteButton onSubmit={onSubmit} wasmStatus={wasmStatus} />

        </form>
      </div>
    </div>
  );
}