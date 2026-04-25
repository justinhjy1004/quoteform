import React, { useState } from 'react';
import { useFieldArray, Controller } from 'react-hook-form';

import TagInput from './TagInput';

const DiscountAdder = ({ index, addDiscount, register, removeDiscount, discountFields }) => {

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-medium text-gray-700">Other Discounts</h3>
        <button type="button" onClick={() => addDiscount({ type: '', amount: 0 })} className="text-l bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded transition">
          + Add Discount
        </button>
      </div>
      <div className="space-y-2">
        {discountFields.map((item, dIndex) => (
          <div key={item.id} className="flex gap-2 items-center">
            <input type="text" placeholder="Type" {...register(`options.${index}.other_discounts.${dIndex}.type`)} className="flex-grow p-1 border rounded text-xl" />
            <input type="number" step="0.01" placeholder="Amount" {...register(`options.${index}.other_discounts.${dIndex}.amount`, { valueAsNumber: true })} className="w-32 p-1 border rounded text-l" />
            <button type="button" onClick={() => removeDiscount(dIndex)} className="text-red-500 hover:bg-red-50 rounded px-2 py-1 font-bold transition">
              &times;
            </button>
          </div>
        ))}
        {discountFields.length === 0 && <p className="text-m text-gray-400 italic">No extra discounts applied.</p>}
      </div>
    </div>);
};

const FurnishingPackage = ({ register, control, index }) => {

  return (<div>
    <h3 className="font-medium text-gray-700 mb-3 text-xl">Furnishing Package</h3>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      {['kitchen_cabinet', 'hood_and_hob', 'fridge', 'toilet', 'heater', 'shower_screen'].map((item) => (
        <label key={item} className="flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" {...register(`options.${index}.furnishing.${item}`)} className="rounded text-blue-600 focus:ring-blue-500" />
          <span className="text-l capitalize">{item.replace(/_/g, ' ')}</span>
        </label>
      ))}
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {['washing_machine_qty', 'airconds_qty', 'wardrobe_qty', 'bed_set_qty'].map((item) => (
        <div
          key={item}
          className="flex items-center justify-between bg-gray-100 p-1.5 px-3 rounded-full border border-gray-200 hover:bg-white hover:shadow-sm transition-all"
        >
          <label className="text-l font-medium text-gray-600 mr-3 whitespace-nowrap capitalize">
            {item.replace(/_qty/g, '').replace(/_/g, ' ')}
          </label>

          <div className="flex items-center bg-white rounded-full border border-gray-300 overflow-hidden">
            <input
              type="number"
              min="0"
              {...register(`options.${index}.furnishing.${item}`, { valueAsNumber: true })}
              className="w-12 text-center text-l font-bold py-0.5 focus:outline-none appearance-none"
            />
          </div>
        </div>
      ))}
    </div>
    <div>
      <label className="block text-l font-medium mb-1">Additional Items</label>
      <Controller
        control={control}
        name={`options.${index}.furnishing.additional_items`}
        render={({ field: { value, onChange } }) => (
          <TagInput value={value} onChange={onChange} placeholder="Type and press Enter..." />
        )}
      />
    </div>
  </div>);

};

const OptionPanel = ({ index, control, register, removeOption }) => {
  // Nested field array for other discounts
  const { fields: discountFields, append: addDiscount, remove: removeDiscount } = useFieldArray({
    control,
    name: `options.${index}.other_discounts`
  });

  return (
    <div className="option-panel space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        {index > 0 && (
          <button type="button" onClick={() => removeOption(index)} className="text-sm text-red-600 hover:text-red-800 font-medium">
            Remove Option
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-4">
          <label className="block text-l font-medium">Option Name</label>
          <input type="text" {...register(`options.${index}.option_name`)} className="w-full mt-1 p-2 border rounded font-semibold" />
        </div>
        <div>
          <label className="block text-l font-medium">Rebate Amount</label>
          <input type="number" step="100" {...register(`options.${index}.rebate`, { valueAsNumber: true })} className="w-full mt-1 p-2 border rounded" />
        </div>
        <div>
          <label className="block text-l font-medium">Cashback</label>
          <input type="number" step="100" {...register(`options.${index}.cashback`, { valueAsNumber: true })} className="w-full mt-1 p-2 border rounded" />
        </div>
        <div>
          <label className="block text-l font-medium">Down Payment</label>
          <input type="number" step="100" {...register(`options.${index}.down_payment`, { valueAsNumber: true })} className="w-full mt-1 p-2 border rounded" />
        </div>
        <div>
          <label className="block text-l font-medium font-bold">Nett Price</label>
          <input type="number" step="100" {...register(`options.${index}.nett_price`, { valueAsNumber: true })} className="w-full mt-1 p-2 border rounded border-gray-400 bg-gray-50" />
        </div>
        <div>
          <label className="block text-l font-medium">Loan Amount</label>
          <input type="number" step="100" {...register(`options.${index}.loan_amount`, { valueAsNumber: true })} className="w-full mt-1 p-2 border rounded" />
        </div>
        <div>
          <label className="block text-l font-medium">Interest Rate (%)</label>
          <input type="number" step="0.1" {...register(`options.${index}.interest_rate`, { valueAsNumber: true })} className="w-full mt-1 p-2 border rounded" />
        </div>
        <div>
          <label className="block text-l font-medium">Monthly Instalment</label>
          <input type="number" step="100" {...register(`options.${index}.monthly_instalment`, { valueAsNumber: true })} className="w-full mt-1 p-2 border rounded" />
        </div>
      </div>

      <hr className="border-gray-200" />

      <DiscountAdder index={index} addDiscount={addDiscount} register={register} removeDiscount={removeDiscount} discountFields={discountFields} />

      <hr className="border-gray-200" />

      <FurnishingPackage register={register} control={control} index={index} />

    </div>
  );
};

export default OptionPanel;