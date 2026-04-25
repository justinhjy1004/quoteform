import React from 'react';

const PresetSection = ({ register, watch }) => {
  // Watch the data
  const projectDetails = watch("project_details") || {};
  const agentData = watch("agent") || {};

  // Get keys
  const projectKeys = Object.keys(projectDetails).slice(0, 2);
  const agentKeys = Object.keys(agentData);

  return (
    <section className="p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h2 className="text-lg font-semibold mb-4 text-black-600 border-b pb-2">
        Project & Agent
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Project Details Part */}
        {projectKeys.map((key) => (
          <div key={key}>
            <label className="block text-xs text-gray-500 uppercase">
              {key.replace('_', ' ')}
            </label>
            <input
              type="text"
              {...register(`project_details.${key}`)}
              readOnly
              className="w-full mt-1 p-2 border rounded bg-gray-200 text-gray-500 cursor-not-allowed"
            />
          </div>
        ))}

        {/* Agent Part with Dynamic Spanning */}
        {agentKeys.map((key, index) => {
          // Check if it's the last item in an odd-lengthed list
          const isLastAndOdd = agentKeys.length % 2 !== 0 && index === agentKeys.length - 1;

          return (
            <div 
              key={key} 
              className={isLastAndOdd ? 'md:col-span-2' : ''}
            >
              <label className="block text-xs text-gray-500 uppercase">
                Agent {key.replace('_', ' ')}
              </label>
              <input
                type="text"
                {...register(`agent.${key}`)}
                readOnly
                className="w-full mt-1 p-2 border rounded bg-gray-200 text-gray-500 cursor-not-allowed"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PresetSection;