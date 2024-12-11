import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const Tab = ({
  isActive,
  size,
  text,
  number,
  handleClick,
  width,
  icon,
}: {
  handleClick: () => void;
  text?: string;
  number?: number;
  size: "sm" | "md";
  width: "fit" | "full";
  isActive: boolean;
  icon?: IconDefinition;
}) => (
  <p
    onClick={handleClick}
    className={`rounded-[6px] cursor-pointer px-[12px] text-center
        ${width === "full" && "w-[100%]"}
        ${size === "sm" ? "py-[8px]" : "py-[10px]"}
        ${size === "sm" ? "text-sm-sb" : "text-md-sb"}
        ${isActive && "shadow-sm"}
        ${isActive ? "bg-base-white" : "transparent"} 
        ${isActive ? "text-gray-700" : "text-gray-500"}`}
  >
    {icon && <FontAwesomeIcon icon={icon} className="mr-[4px]" />}
    {text}
    {number && (
      <p className="inline text-xs-m text-gray-700 py-[2px] px-[8px] ml-[8px] rounded-full aspect-square text-gray-700 bg-gray-50 border-[1px] border-gray-200">
        {number}
      </p>
    )}
  </p>
);




export interface ITabItem {
  text?: string;
  number?: number;
  index: number;
  icon?: IconDefinition;
}

export interface ISTertiaryTabs {
  size?: "sm" | "md";
  items: ITabItem[];
  width?: "fit" | "full";
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
}

function STertiaryTabs({
  size = "sm",
  items,
  selected,
  setSelected,
  width = "fit",
  className,
}: ISTertiaryTabs) {
  return (
    <div
      className={`${className} flex ${size === "sm" ? "p-[4px]" : "p-[6px]"} ${width === "full" && "justify-between"}  gap-[4px] bg-gray-50 border-[1px] border-gray-200 rounded-[10px]`}
    >
      {items.map((item) => (
        <Tab
          width={width}
          handleClick={() => {
            setSelected(item.index);
          }}
          isActive={item.index === selected}
          text={item.text}
          number={item.number}
          size={size}
          icon={item.icon} 
          key={item.index}
        />
      ))}
    </div>
  );
}

export default STertiaryTabs;