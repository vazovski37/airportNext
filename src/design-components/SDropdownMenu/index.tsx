import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { AnchorProps } from "@headlessui/react/dist/internal/floating";

import React from "react";

interface ISDropdownMenu {
  menuButton: React.ReactNode;
  items: IDropdownMenuItem[];
  anchor?: AnchorProps;
}
export interface IDropdownMenuItem {
  title: string;
  icon?: IconProp;
  className?: string;
  handleClick: () => void;
}

function SDropdownMenu({
  anchor = "bottom start",
  items,
  menuButton,
}: ISDropdownMenu) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton>{menuButton}</MenuButton>
      </div>

      <MenuItems
        anchor={anchor}
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          {items.map((item) => (
            <MenuItem>
              <div
                onClick={() => item.handleClick()}
                className={`${item.className} text-gray-800 flex items-center gap-[8px] px-4 py-2 data-[focus]:bg-gray-100 cursor-pointer`}
              >
                {item.icon && <FontAwesomeIcon icon={item.icon} />}
                <p className="text-sm">{item.title}</p>
              </div>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}

export default SDropdownMenu;
