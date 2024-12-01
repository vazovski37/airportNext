import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type InputProps = {
  label: string;
  className: string;
  type: 'dropDown' | 'email' | 'text' | 'password' | 'date';
  licon?: IconDefinition;  
  ricon?: IconDefinition;  
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
};

const IInput: React.FC<InputProps> = ({
  label,
  type,
  licon,
  ricon,
  onChange,
  placeholder,
}) => {
  const baseStyles =
    'flex items-center justify-center gap-2 px-4 py-2 rounded-md font-semibold focus:outline-none w-full';

  const solidStyles =
    'bg-orange-500 text-white hover:bg-orange-600 focus:ring-4 focus:ring-orange-300';
  const transparentStyles =
    'bg-transparent text-orange-500 border border-orange-500 hover:bg-orange-100 focus:ring-4 focus:ring-orange-300';

  const inputStyles = `${baseStyles} ${solidStyles}`; 

  
  if (type === 'dropDown') {
    return (
      <div className="flex flex-col">
        {label && <label className="mb-1 text-sm text-gray-700">{label}</label>}
        <div className="flex items-center border border-gray-300 rounded-md">
          {licon && <FontAwesomeIcon icon={licon} className="w-4 h-4 ml-2" />}
          <select
            onChange={onChange} 
            className={`${inputStyles} flex-1`}
          >
            <option value="">{placeholder || 'Select an option'}</option> 
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
          {ricon && <FontAwesomeIcon icon={ricon} className="w-4 h-4 mr-2" />}
        </div>
      </div>
    );
  } else if (type === 'email' || type === 'text' || type === 'password' || type === 'date') {
    return (
      <div className="flex flex-col">
        {label && <label className="mb-1 text-sm text-gray-700">{label}</label>}
        <div className="flex items-center border border-gray-300 rounded-md">
          {licon && <FontAwesomeIcon icon={licon} className="w-4 h-4 ml-2" />}
          <input
            type={type} 
            onChange={onChange} 
            placeholder={placeholder || `Enter your ${label.toLowerCase()}`} 
            className={`${inputStyles} flex-1`}
          />
          {ricon && <FontAwesomeIcon icon={ricon} className="w-4 h-4 mr-2" />}
        </div>
      </div>
    );
  }

  return null; 
};

export default IInput;
