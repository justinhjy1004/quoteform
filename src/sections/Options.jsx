import React from 'react';
import OptionPanel from '../components/OptionPanel';
import { defaultOption } from "../Default";

const OptionsSection = ( {register, control, activeTab, setActiveTab, optionFields, addOption, removeOption, optionsWatcher, setValue }) => {
    return (<section className="border rounded-lg overflow-hidden border-blue-200">
            <div className="bg-blue-50 px-4 py-3 flex items-center justify-between border-b border-blue-200">
              <h2 className="text-lg font-semibold text-blue-800">Quotation Options</h2>
              <button 
                type="button" 
                onClick={() => {
                  addOption({ ...defaultOption, option_name: "" });
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
                    setValue={setValue}
                  />
                </div>
              ))}
            </div>
          </section>);
};

export default OptionsSection;