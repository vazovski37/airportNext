import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

type BadgeSize = "sm" | "md" | "lg";
type BadgeColor =
  | "gray"
  | "red"
  | "warning"
  | "pink"
  | "sky"
  | "violet"
  | "indigo"
  | "emerald"
  | "amber"
  | "slate"
  | "purple"
  | "success";

export interface IBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: BadgeSize;
  color?: BadgeColor;
  children?: React.ReactNode;
  dotted?: boolean;
  hasBackground?: boolean;
  imageSrc?: string;
  icon?: IconProp;
  iconProps?: Omit<FontAwesomeIconProps, "icon">;
  iconLeft?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-fit h-fit px-[8px] py-[2px] text-xs-m",
  md: "w-fit h-fit px-[10px] py-[2px] text-sm-m",
  lg: "w-fit h-fit px-[12px] py-[4px] text-sm-m",
};

const colorClasses = {
  gray: "border-gray-200 text-slate-700 rounded-[16px]",
  red: "border-red-200 text-red-700 rounded-[16px]",
  warning: "border-warning-200 text-warning-700 rounded-[16px]",
  pink: "border-pink-200 text-pink-700 rounded-[16px]",
  sky: "border-sky-200 text-sky-700 rounded-[16px]",
  violet: "border-violet-200 text-violet-700 rounded-[16px]",
  indigo: "border-indigo-200 text-indigo-700 rounded-[16px]",
  emerald: "border-emerald-200 text-emerald-700 rounded-[16px]",
  amber: "border-amber-200 text-amber-700 rounded-[16px]",
  slate: "border-slate-300 text-indigo-900 rounded-[16px]",
  purple: "border-violet-200 text-purple-700 rounded-[16px]",
  success: "border-success-200 text-success-700 rounded-[16px]",
  white: "border-gray-300 text-slate-700 rounded-[6px]",
};

const bgColorClasses = {
  gray: "bg-gray-50",
  red: "bg-red-50",
  warning: "bg-warning-50",
  pink: "bg-pink-50",
  sky: "bg-sky-50",
  violet: "bg-violet-50",
  indigo: "bg-indigo-50",
  emerald: "bg-emerald-50",
  amber: "bg-amber-50",
  slate: "bg-slate-50",
  purple: "bg-violet-50",
  white: "bg-base-white",
  success: "bg-success-50",
};

const dotColorClasses = {
  gray: "bg-gray-500",
  red: "bg-red-500",
  warning: "bg-warning-500",
  pink: "bg-pink-500",
  sky: "bg-sky-500",
  violet: "bg-violet-500",
  indigo: "bg-indigo-500",
  emerald: "bg-green-500",
  amber: "bg-amber-500",
  slate: "bg-slate-500",
  purple: "bg-purple-500",
  success: "bg-success-500",
};

function valueBySize(size: BadgeSize, arr: string[]) {
  switch (size) {
    case "sm":
      return arr[0];
    case "md":
      return arr[1];
    case "lg":
      return arr[2];
    default:
      return arr[1];
  }
}

function valueByColor(color: BadgeColor, arr: string[]) {
  switch (color) {
    case "gray":
      return arr[0];
    case "red":
      return arr[1];
    case "warning":
      return arr[2];
    case "pink":
      return arr[3];
    case "sky":
      return arr[4];
    case "violet":
      return arr[5];
    case "indigo":
      return arr[6];
    case "emerald":
      return arr[7];
    case "amber":
      return arr[8];
    case "slate":
      return arr[9];
    case "purple":
      return arr[10];
    case "success":
      return arr[11];
    default:
      return arr[0];
  }
}
function SBadge({
  size = "md",
  color = "gray",
  children,
  dotted,
  hasBackground = true,
  imageSrc,
  icon,
  iconProps,
  iconLeft = true,
  className,
}: IBadgeProps) {
  return (
    <div
      className={`
        ${className}
        shadow border justify-start items-center inline-flex
        ${valueBySize(size, [sizeClasses.sm, sizeClasses.md, sizeClasses.lg])}
        ${hasBackground ? valueByColor(color, [colorClasses.gray, colorClasses.red, colorClasses.warning, colorClasses.pink, colorClasses.sky, colorClasses.violet, colorClasses.indigo, colorClasses.emerald, colorClasses.amber, colorClasses.slate, colorClasses.purple, colorClasses.success]) : colorClasses.white}
        ${hasBackground ? valueByColor(color, [bgColorClasses.gray, bgColorClasses.red, bgColorClasses.warning, bgColorClasses.pink, bgColorClasses.sky, bgColorClasses.violet, bgColorClasses.indigo, bgColorClasses.emerald, bgColorClasses.amber, bgColorClasses.slate, bgColorClasses.purple, bgColorClasses.success]) : "bg-base-white"}
        ${!children ? "rounded-full" : " "}
        ${dotted || imageSrc || (icon && children) ? "gap-[8px]" : ""}
      `}
    >
      {imageSrc && (
        <div className="w-[16px] h-[16px] rounded-full justify-center items-center flex">
          <img
            src={imageSrc}
            className="w-[16px] h-[16px] relative rounded-full border border-black"
            alt="icon"
          />
        </div>
      )}
      {dotted && !imageSrc && !icon && (
        <div className="w-[8px] h-[8px] rounded-full">
          <div
            className={`${valueByColor(color, [dotColorClasses.gray, dotColorClasses.red, dotColorClasses.warning, dotColorClasses.pink, dotColorClasses.sky, dotColorClasses.violet, dotColorClasses.indigo, dotColorClasses.emerald, dotColorClasses.amber, dotColorClasses.slate, dotColorClasses.purple, dotColorClasses.success])} w-full h-full rounded-full`}
          />
        </div>
      )}
      {icon && iconLeft && children && (
        <div className="w-[8px] h-[8px] rounded-full justify-center items-center flex">
          <FontAwesomeIcon icon={icon} {...iconProps} />
        </div>
      )}
      {children && <>{children}</>}
      {icon && !iconLeft && children && (
        <div className="w-[8px] h-[8px] rounded-full justify-center items-center flex">
          <FontAwesomeIcon icon={icon} {...iconProps} />
        </div>
      )}
      {!children && icon && <FontAwesomeIcon icon={icon} {...iconProps} />}
    </div>
  );
}

export default SBadge;
