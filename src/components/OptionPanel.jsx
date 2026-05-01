import React, { useState, useEffect } from 'react';
import { useFieldArray, Controller, useWatch } from 'react-hook-form';
import TagInput from './TagInput';
import { formatNumber, parseNumber, revertToNumeric, getNumeric, calculateMonthlyInstalment } from './Helper';

// 1. Added 'control' to the props
const DiscountAdder = ({ index, addDiscount, register, removeDiscount, discountFields, control, setValue }) => {
  
  // 2. This "watches" the array for this specific index
  const watchedDiscounts = useWatch({
    control,
    name: `options.${index}.other_discounts`,
    defaultValue: [],
  });

  const totalDiscount = (watchedDiscounts || []).reduce((acc, curr) => {
      // Ensure we have a valid number, default to 0 if empty/NaN
      const val = Number(curr?.percentage) || 0;
      return acc + val;
    }, 0);
  

  useEffect(() => {
    setValue(`options.${index}.other_discounts_total`, totalDiscount);
  }, [watchedDiscounts, setValue]);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-medium text-gray-700">Other Discounts</h3>
        <button 
          type="button" 
          onClick={() => addDiscount({ type: '', amount: 0 })} 
          className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1.5 rounded transition-all font-medium"
        >
          + Add Discount
        </button>
      </div>
      
      <div className="space-y-2">
        {discountFields.map((item, dIndex) => (
          <div key={item.id} className="flex gap-2 items-center">
            <input 
              type="text" 
              placeholder="Discount Name (e.g., Seasonal)" 
              {...register(`options.${index}.other_discounts.${dIndex}.type`)} 
              className="flex-grow p-2 border rounded text-base focus:ring-2 focus:ring-blue-100 outline-none" 
            />
            
            <div className="relative w-32">
              <input 
                type="number" 
                step="0.01" 
                min="0"
                max="100"
                placeholder="0.00" 
                {...register(`options.${index}.other_discounts.${dIndex}.percentage`, { valueAsNumber: true })} 
                onFocus={(e) => e.target.select()} 
                className="w-full p-2 pr-7 border rounded text-base focus:ring-2 focus:ring-blue-100 outline-none text-right" 
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium select-none pointer-events-none">
                %
              </span>
            </div>

            <button 
              type="button" 
              onClick={() => removeDiscount(dIndex)} 
              className="text-red-500 hover:bg-red-50 rounded px-2 py-1.5 font-bold transition flex-shrink-0"
              aria-label="Remove discount"
            >
              &times;
            </button>
          </div>
        ))}
        
        {/* 4. Display the total at the bottom */}
        {discountFields.length > 0 && (
          <div className="flex justify-end items-center pt-2 border-t mt-2">
            <span className="text-sm text-gray-500 mr-2 font-medium">Total Additional Discount:</span>
            <span className="text-lg font-bold text-gray-800">{totalDiscount.toFixed(2)}%</span>
          </div>
        )}

        {discountFields.length === 0 && (
          <p className="text-sm text-gray-400 italic">No extra percentage discounts applied.</p>
        )}
      </div>
    </div>
  );
};

const FurnishingPackage = ({ register, control, index }) => {

  const furnish_items = ['kitchen_cabinet', 'hood_and_hob', 'fridge', 'toilet', 'heater', 'shower_screen', 'bathroom_accessories', 'light_fixtures']

  const furnish_item_quantity = ['washing_machine_qty', 'airconds_qty', 'wardrobe_qty', 'bed_set_qty']

  return (<div>
    <h3 className="font-medium text-gray-700 mb-3 text-xl">Furnishing Package</h3>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      {furnish_items.map((item) => (
        <label key={item} className="flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" {...register(`options.${index}.furnishing.${item}`)} className="rounded text-blue-600 focus:ring-blue-500" />
          <span className="text-l capitalize">{item.replace(/_/g, ' ')}</span>
        </label>
      ))}
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {furnish_item_quantity.map((item) => (
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
              onFocus={(e) => e.target.select()}
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

const OptionPanel = ({ index, control, register, removeOption, setValue }) => {
  // Nested field array for other discounts
  const { fields: discountFields, append: addDiscount, remove: removeDiscount } = useFieldArray({
    control,
    name: `options.${index}.other_discounts`
  });


  const watchedSPA = useWatch({
    control,
    name: `project_details.spa_price`,
    defaultValue: 0,
  });

  const watchedRebatePercentage = useWatch({
    control,
    name: `options.${index}.rebate_percentage`,
    defaultValue: 0,
  });

  const watchedRebateAmount = useWatch({
    control,
    name: `options.${index}.rebate_amount`,
    defaultValue: 0,
  });

  const watchedCashbackAmount = useWatch({
    control,
    name: `options.${index}.cashback`,
    defaultValue: 0,
  });

  const watchedCashbackType = useWatch({
    control,
    name: `options.${index}.cashback_type`,
    defaultValue: 0,
  });

  const watchedDownPayment = useWatch({
    control,
    name: `options.${index}.down_payment`,
    defaultValue: 0,
  });

  const watchedTotalAdditionalDiscount = useWatch({
    control,
    name: `options.${index}.other_discounts_total`,
    defaultValue: 0,
  });

  const watchedInterestRate = useWatch({
    control,
    name: `options.${index}.interest_rate`,
    defaultValue: 0,
  });

  const watchedLoanTenure = useWatch({
    control,
    name: `options.${index}.loan_tenure_year`,
    defaultValue: 30,
  });

  const watchedLoanAmount = useWatch({
    control,
    name: `options.${index}.loan_amount`,
    defaultValue: 30,
  });

  useEffect(() => {
    const rebateAmount = getNumeric(watchedSPA) * (getNumeric(watchedRebatePercentage) / 100);

    setValue(`options.${index}.rebate_amount`, rebateAmount);
  }, [watchedSPA, watchedRebatePercentage, setValue]);

  useEffect(() => {
    
    let loanAmount = getNumeric(watchedSPA) * (1-(getNumeric(watchedTotalAdditionalDiscount)/100)) - getNumeric(watchedRebateAmount) - getNumeric(watchedDownPayment);

    if (watchedCashbackType === "Offset to Loan") {
       loanAmount = loanAmount - getNumeric(watchedCashbackAmount);
    }

    setValue(`options.${index}.loan_amount`, loanAmount);
  }, [watchedSPA, watchedTotalAdditionalDiscount, watchedRebateAmount, watchedDownPayment, watchedCashbackAmount, watchedCashbackType, setValue]);

  useEffect(() => {
    
    const nettPrice = getNumeric(watchedSPA) * (1-(getNumeric(watchedTotalAdditionalDiscount)/100)) - getNumeric(watchedRebateAmount) - getNumeric(watchedCashbackAmount);
    setValue(`options.${index}.nett_price`, nettPrice);
  }, [watchedSPA, watchedTotalAdditionalDiscount, watchedRebateAmount, watchedCashbackAmount, setValue]);

  useEffect(() => {
    
    const monthlyInstalment = calculateMonthlyInstalment(getNumeric(watchedLoanAmount), getNumeric(watchedInterestRate)/100, getNumeric(watchedLoanTenure));

    setValue(`options.${index}.monthly_instalment`, monthlyInstalment);
  }, [watchedLoanAmount, watchedInterestRate, watchedLoanTenure, setValue]);

  return (
    <div className="option-panel space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        {index > 0 && (
          <button type="button" onClick={() => removeOption(index)} className="text-sm text-red-600 hover:text-red-800 font-medium">
            Remove Option
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="md:col-span-4">
          <label className="block text-l font-medium">Option Name</label>
          <input type="text" {...register(`options.${index}.option_name`)} className="w-full mt-1 p-2 border rounded font-semibold" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <label className="block text-l font-medium">Rebate (%)</label>
          <input
            type="number"
            step="0.01"
            defaultValue={0}
            {...register(`options.${index}.rebate_percentage`, { valueAsNumber: true })}
            onFocus={(e) => e.target.select()}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-l font-medium">Rebate Amount</label>
          <Controller
            name={`options.${index}.rebate_amount`}
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <input
                type="text"
                value={formatNumber(value)}
                onChange={(e) => onChange(parseNumber(e.target.value))}
                onBlur={(e) => revertToNumeric(e, onBlur, onChange)}
                onFocus={(e) => e.target.select()}
                className="w-full mt-1 p-2 border rounded"
              />
            )}
          />
        </div>
        {/* Combined Cashback & Radio Row */}
        <div className="md:col-span-4 flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-grow">
            <label className="block text-l font-medium">Cashback</label>
            <Controller
              name={`options.${index}.cashback`}
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <input
                  type="text"
                  value={formatNumber(value)}
                  onChange={(e) => onChange(parseNumber(e.target.value))}
                  onBlur={(e) => revertToNumeric(e, onBlur, onChange)}
                  onFocus={(e) => e.target.select()}
                  className="w-full mt-1 p-2 border rounded"
                />
              )}
            />
          </div>

          <div className="flex items-center bg-gray-100 p-1 rounded-lg h-[42px]"> {/* Match height of input approx */}
            <label className="relative flex-1">
              <input
                type="radio"
                value="Cash Out"
                {...register(`options.${index}.cashback_type`)} // Adjusted name to match your nesting pattern
                className="peer sr-only"
              />
              <div className="px-4 py-1.5 rounded-md cursor-pointer transition-all 
        peer-checked:bg-white peer-checked:text-red-600 peer-checked:shadow-sm 
        text-gray-500 hover:text-gray-700 font-medium text-m whitespace-nowrap">
                Cash Out
              </div>
            </label>

            <label className="relative flex-1">
              <input
                type="radio"
                value="Offset to Loan"
                {...register(`options.${index}.cashback_type`)} // Adjusted name to match your nesting pattern
                className="peer sr-only"
              />
              <div className="px-4 py-1.5 rounded-md cursor-pointer transition-all 
        peer-checked:bg-white peer-checked:text-green-600 peer-checked:shadow-sm 
        text-gray-500 hover:text-gray-700 font-medium text-m whitespace-nowrap">
                Offset to Loan
              </div>
            </label>
          </div>
        </div>
      </div>

      <DiscountAdder index={index} addDiscount={addDiscount} register={register} removeDiscount={removeDiscount} discountFields={discountFields} control={control} setValue={setValue}/>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="md:col-span-2">
          <label className="block text-l font-medium">Down Payment</label>
          <Controller
            name={`options.${index}.down_payment`}
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <input
                type="text"
                defaultValue={0}
                value={formatNumber(value)}
                onChange={(e) => onChange(parseNumber(e.target.value))}
                onBlur={(e) => revertToNumeric(e, onBlur, onChange)}
                onFocus={(e) => e.target.select()}
                className="w-full mt-1 p-2 border rounded"
              />
            )}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-l font-medium">Loan Amount</label>
          <Controller
            name={`options.${index}.loan_amount`}
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <input
                type="text"
                value={formatNumber(value)}
                onChange={(e) => onChange(parseNumber(e.target.value))}
                onBlur={(e) => revertToNumeric(e, onBlur, onChange)}
                onFocus={(e) => e.target.select()}
                readOnly
                className="w-full mt-1 p-2 border rounded bg-gray-100 cursor-not-allowed"
              />
            )}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-l font-medium font-bold">Nett Price</label>
          <Controller
            name={`options.${index}.nett_price`}
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <input
                type="text"
                value={formatNumber(value)}
                onChange={(e) => onChange(parseNumber(e.target.value))}
                onBlur={(e) => revertToNumeric(e, onBlur, onChange)}
                onFocus={(e) => e.target.select()}
                readOnly
                className="w-full mt-1 p-2 border rounded border-gray-400 bg-gray-100 cursor-not-allowed"
              />
            )}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-l font-medium">Interest Rate (%)</label>
          <input type="number" step="0.05" {...register(`options.${index}.interest_rate`, { valueAsNumber: true })} onFocus={(e) => e.target.select()} className="w-full mt-1 p-2 border rounded" />
        </div>
         <div className="md:col-span-2">
          <label className="block text-l font-medium">Loan Tenure (Year)</label>
          <input type="number" defaultValue={30} step="1" {...register(`options.${index}.loan_tenure_year`, { valueAsNumber: true })} onFocus={(e) => e.target.select()} className="w-full mt-1 p-2 border rounded" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-l font-medium">Monthly Instalment</label>
          <Controller
            name={`options.${index}.monthly_instalment`}
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <input
                type="text"
                value={formatNumber(value)}
                onChange={(e) => onChange(parseNumber(e.target.value))}
                onBlur={(e) => revertToNumeric(e, onBlur, onChange)}
                onFocus={(e) => e.target.select()}
                readOnly
                className="w-full mt-1 p-2 border rounded bg-gray-100 cursor-not-allowed"
              />
            )}
          />
        </div>
      </div>

      <hr className="border-gray-200" />

      <hr className="border-gray-200" />

      <FurnishingPackage register={register} control={control} index={index} />

    </div>
  );
};

export default OptionPanel;