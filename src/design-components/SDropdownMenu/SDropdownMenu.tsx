import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export interface IDropdownMenuItem {
  title: string;
  icon?: IconProp;
  className?: string;
  handleClick: () => void;
}

interface ISDropdownMenu {
  menuButton: React.ReactNode;
  items: IDropdownMenuItem[];
}

const SDropdownMenu: React.FC<ISDropdownMenu> = ({ menuButton, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      {/* Button */}
      <div onClick={() => setIsOpen(!isOpen)}>{menuButton}</div>

      {/* Menu Items */}
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {items.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  item.handleClick();
                  setIsOpen(false);
                }}
                className={`${item.className} flex items-center gap-2 px-4 py-2 text-gray-800 cursor-pointer hover:bg-gray-100`}
              >
                {item.icon && <FontAwesomeIcon icon={item.icon} />}
                <p className="text-sm">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SDropdownMenu;
