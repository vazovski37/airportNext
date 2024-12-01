import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface UnifiedButtonProps {
  label: string;
  onClick: () => void;
  type?: 'solid' | 'transparent';
  color?: string;
  textColor?: string;
  shape?: 'rounded' | 'square' | 'pill';
  size?: 'small' | 'medium' | 'large';
  licon?: IconDefinition; // Correct type for FontAwesome icons
  ricon?: IconDefinition; // Correct type for FontAwesome icons
  disabled?: boolean;
  outline?: boolean;
  width?: string;
  height?: string;
}

const UnifiedButton: React.FC<UnifiedButtonProps> = ({
  label,
  onClick,
  type = 'solid',
  color = '#FFA500',
  textColor = '#FFFFFF',
  shape = 'rounded',
  size = 'medium',
  licon = null,
  ricon = null,
  disabled = false,
  outline = false,
  width = 'auto',
  height = 'auto',
}) => {
  const baseStyles = `
    flex items-center justify-center gap-2 font-semibold
    ${size === 'small' ? 'px-3 py-1 text-sm' : size === 'large' ? 'px-6 py-3 text-lg' : 'px-4 py-2 text-base'}
    ${shape === 'rounded' ? 'rounded-md' : shape === 'pill' ? 'rounded-full' : 'rounded-sm'}
    ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
    transition duration-300 ease-in-out
  `;

  const solidStyles = `
    ${disabled ? '' : 'hover:brightness-110'}
    bg-${outline ? 'transparent' : color} text-${outline ? color : textColor}
    border border-${color}
  `;

  const transparentStyles = `
    ${disabled ? '' : 'hover:bg-orange-100'}
    bg-transparent text-${color} border border-${color}
  `;

  const buttonStyles = type === 'solid' ? solidStyles : transparentStyles;

  const styles: React.CSSProperties = {
    width,
    height,
  };

  return (
    <button
      onClick={!disabled ? onClick : undefined}
      style={styles}
      className={`${baseStyles} ${buttonStyles}`}
    >
      {licon && <FontAwesomeIcon icon={licon} />}
      <span>{label}</span>
      {ricon && <FontAwesomeIcon icon={ricon} />}
    </button>
  );
};

export default UnifiedButton;
