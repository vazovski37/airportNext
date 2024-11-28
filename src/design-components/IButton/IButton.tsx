import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type ButtonProps = {
  label: string;
  type: 'solid' | 'transparent';
  licon?: IconDefinition;  // FontAwesome Icon
  ricon?: IconDefinition;  // FontAwesome Icon
  onClick: () => void;
};

const IButton: React.FC<ButtonProps> = ({ label, type, licon, ricon, onClick }) => {
  const baseStyles = 'flex items-center justify-center gap-2 px-4 py-2 rounded-md font-semibold focus:outline-none';
  
  // Conditional styling based on button type
  const solidStyles = 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-4 focus:ring-orange-300';
  const transparentStyles = 'bg-transparent text-orange-500 border border-orange-500 hover:bg-orange-100 focus:ring-4 focus:ring-orange-300';

  const buttonStyles = type === 'solid' ? solidStyles : transparentStyles;

  return (
    <button onClick={onClick} className={`${baseStyles} ${buttonStyles}`}>
      {licon && <FontAwesomeIcon icon={licon} className="w-4 h-4" />}
      <span>{label}</span>
      {ricon && <FontAwesomeIcon icon={ricon} className="w-4 h-4" />}
    </button>
  );
};

export default IButton;
