import React from 'react';

type ButtonProps = {
  label: string;
  type: 'solid' | 'transparent';
  licon?: React.ReactNode;
  ricon?: React.ReactNode;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ label, type, licon, ricon, onClick }) => {
  const baseStyles = 'flex items-center justify-center gap-2 px-4 py-2 rounded-md font-semibold';
  
  // Conditional styling based on button type
  const solidStyles = 'bg-orange-500 text-white hover:bg-orange-600';
  const transparentStyles = 'bg-transparent text-orange-500 border border-orange-500 hover:bg-orange-100';

  const buttonStyles = type === 'solid' ? solidStyles : transparentStyles;

  return (
    <button onClick={onClick} className={`${baseStyles} ${buttonStyles}`}>
      {licon && <span>{licon}</span>}
      <span>{label}</span>
      {ricon && <span>{ricon}</span>}
    </button>
  );
};

export default Button;
