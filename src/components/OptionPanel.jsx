import React, { useState } from 'react';
import { useFieldArray, Controller } from 'react-hook-form';

import TagInput from './TagInput';

const OptionPanel = ({ index, control, register, removeOption }) => {
  // Nested field array for other discounts
  const { fields: discountFields, append: addDiscount, remove: removeDiscount } = useFieldArray({
    control,
    name: `options.${index}.other_discounts`
  });

  return (
    <div className="option-panel space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-700">Configuration</h3>
        {index > 0 && (
          <button type="button" onClick={() => removeOption(index)} className="text-sm text-red-600 hover:text-red-800 font-medium">
            Remove Option
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-4">
          <label className="block text-sm font-medium">Option Name</label>
          <input type="text" {...register(`options.${index}.option_name`)} className="w-full mt-1 p-2 border rounded font-semibold" />
        </div>
        <div>
          <label className="block text-sm font-medium text-red-600">Rebate Amount</label>
          <input type="number" step="0.01" {...register(`options.${index}.rebate`, { valueAsNumber: true })} className="w-full mt-1 p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium text-green-600">Cashback</label>
          <input type="number" step="0.01" {...register(`options.${index}.cashback`, { valueAsNumber: true })} className="w-full mt-1 p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Down Payment</label>
          <input type="number" step="0.01" {...register(`options.${index}.down_payment`, { valueAsNumber: true })} className="w-full mt-1 p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium font-bold">Nett Price</label>
          <input type="number" step="0.01" {...register(`options.${index}.nett_price`, { valueAsNumber: true })} className="w-full mt-1 p-2 border rounded border-gray-400 bg-gray-50" />
        </div>
        <div>
          <label className="block text-sm font-medium">Loan Amount</label>
          <input type="number" step="0.01" {...register(`options.${index}.loan_amount`, { valueAsNumber: true })} className="w-full mt-1 p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Interest Rate (%)</label>
          <input type="number" step="0.01" {...register(`options.${index}.interest_rate`, { valueAsNumber: true })} className="w-full mt-1 p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Monthly Instalment</label>
          <input type="number" step="0.01" {...register(`options.${index}.monthly_instalment`, { valueAsNumber: true })} className="w-full mt-1 p-2 border rounded" />
        </div>
      </div>
      
      <hr className="border-gray-200" />
      
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-gray-700">Other Discounts</h3>
          <button type="button" onClick={() => addDiscount({ type: '', amount: 0 })} className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded transition">
            + Add Discount
          </button>
        </div>
        <div className="space-y-2">
          {discountFields.map((item, dIndex) => (
            <div key={item.id} className="flex gap-2 items-center">
              <input type="text" placeholder="Type" {...register(`options.${index}.other_discounts.${dIndex}.type`)} className="flex-grow p-1 border rounded text-sm" />
              <input type="number" step="0.01" placeholder="Amount" {...register(`options.${index}.other_discounts.${dIndex}.amount`, { valueAsNumber: true })} className="w-32 p-1 border rounded text-sm" />
              <button type="button" onClick={() => removeDiscount(dIndex)} className="text-red-500 hover:bg-red-50 rounded px-2 py-1 font-bold transition">
                &times;
              </button>
            </div>
          ))}
          {discountFields.length === 0 && <p className="text-xs text-gray-400 italic">No extra discounts applied.</p>}
        </div>
      </div>
      
      <hr className="border-gray-200" />
      
      <div>
        <h3 className="font-medium text-gray-700 mb-3">Furnishing Package</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {['kitchen_cabinet', 'hood_and_hob', 'fridge', 'toilet', 'heater', 'shower_screen'].map((item) => (
            <label key={item} className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" {...register(`options.${index}.furnishing.${item}`)} className="rounded text-blue-600 focus:ring-blue-500" />
              <span className="text-sm capitalize">{item.replace(/_/g, ' ')}</span>
            </label>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {['washing_machine_qty', 'airconds_qty', 'wardrobe_qty', 'bed_set_qty'].map((item) => (
            <div key={item}>
              <label className="block text-xs text-gray-500 capitalize">{item.replace(/_qty/g, ' Qty').replace(/_/g, ' ')}</label>
              <input type="number" {...register(`options.${index}.furnishing.${item}`, { valueAsNumber: true })} className="w-full mt-1 p-1 border rounded text-sm" />
            </div>
          ))}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Additional Items</label>
          <Controller
            control={control}
            name={`options.${index}.furnishing.additional_items`}
            render={({ field: { value, onChange } }) => (
              <TagInput value={value} onChange={onChange} placeholder="Type and press Enter..." />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default OptionPanel;