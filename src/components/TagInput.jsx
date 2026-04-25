import React, { useState } from 'react';

const TagInput = ({ value = [], onChange, placeholder }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      const val = inputValue.trim();
      if (val && !value.includes(val)) {
        onChange([...value, val]);
        setInputValue('');
      }
    }
  };

  const removeTag = (indexToRemove) => {
    onChange(value.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="p-2 border rounded flex flex-wrap gap-2 items-center bg-white min-h-[42px]">
      {value.map((tag, index) => (
        <span key={index} className="pill bg-blue-100 text-blue-800 text-l px-2 py-1 rounded-full flex items-center gap-1">
          {tag}
          <button type="button" onClick={() => removeTag(index)} className="text-blue-500 font-bold ml-1 hover:text-blue-700">
            &times;
          </button>
        </span>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="outline-none flex-grow min-w-[150px] p-1 text-l bg-transparent"
      />
    </div>
  );
};

export default TagInput;