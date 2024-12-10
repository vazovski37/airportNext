import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import React from "react";

export type SButtonType =
  | "primary"
  | "secondaryGray"
  | "secondaryColor"
  | "tertiaryGray"
  | "tertiaryColor"
  | "linkGray"
  | "linkColor";

export type SButtonSize = "sm" | "md" | "lg" | "xl" | "2xl";

export interface ISButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "type" | "disabled"
  > {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  dot?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  type?: SButtonType;
  size?: SButtonSize;
  icon?: IconProp;
  iconProps?: Omit<FontAwesomeIconProps, "icon">;
  lIcon?: IconProp;
  lIconProps?: Omit<FontAwesomeIconProps, "icon">;
  rIconProps?: Omit<FontAwesomeIconProps, "icon">;
  rIcon?: IconProp;
}
function valueByType(type: SButtonType, arr: string[]) {
  switch (type) {
    case "primary":
      return arr[0];
      break;
    case "secondaryGray":
      return arr[1];
      break;
    case "secondaryColor":
      return arr[2];
      break;
    case "tertiaryGray":
      return arr[3];
      break;
    case "tertiaryColor":
      return arr[4];
      break;
    case "linkGray":
      return arr[5];
      break;
    case "linkColor":
      return arr[6];
      break;
  }
}
function valueBySize(size: SButtonSize, arr: string[]) {
  switch (size) {
    case "sm":
      return arr[0];
      break;
    case "md":
      return arr[1];
      break;
    case "lg":
      return arr[2];
      break;
    case "xl":
      return arr[3];
      break;
    case "2xl":
      return arr[4];
      break;
  }
}

function SButton({
  type = "primary",
  size = "md",
  dot = false,
  children,
  className,
  icon,
  isLoading = false,
  iconProps,
  lIcon,
  lIconProps,
  rIconProps,
  rIcon,
  onClick,
  disabled = false,
  ...props
}: ISButtonProps) {
  return (
    <button
      {...props}
      onClick={() => {
        if (!isLoading && onClick) onClick();
      }}
      disabled={disabled}
      className={` ${className}
        transition-all
        active:shadow-xl
        rounded-[8px]
        flex
        justify-center
        items-center
        ${icon && "aspect-square"}
        ${disabled ? "cursor-auto" : isLoading ? "cursor-auto" : "cursor-pointer"}
        ${isLoading && "opacity-[0.5]"}
        // Gap
        ${valueBySize(size, ["gap-[8px]", "gap-[4px]", "gap-[6px]", "gap-[6px]", "gap-[10px]"])}
        // Shadow
        ${valueByType(type, ["active:shadow-xl", "active:shadow-xl", "active:shadow-xl", "shadow-none", "shadow-none", "shadow-none", "shadow-none"])}
        // background Color
        ${valueByType(type, ["bg-brand-600", "bg-base-white", "bg-brand-50", "bg-transparent", "bg-transparent", "bg-transparent", "bg-transparent"])} 
        ${valueByType(type, ["hover:bg-brand-800", "hover:bg-gray-50", "hover:bg-brand-100", "hover:bg-gray-50", "hover:bg-brand-50", "hover:bg-transparent", "hover:bg-transparent"])} 
        ${valueByType(type, ["disabled:bg-gray-100", "disabled:bg-base-white", "disabled:bg-base-white", "disabled:bg-tra", "disabled:bg-transparent", "disabled:bg-transparent", "disabled:bg-transparent"])} 
        // border Color
        ${valueByType(type, ["border-brand-600", "border-gray-300", "border-brand-300", "border-transparent", "border-transparent", "border-transparent", "border-transparent"])}
        ${valueByType(type, ["disabled:border-gray-200", "disabled:border-gray-200", "disabled:border-gray-200", "disabled:border-transparent", "disabled:border-transparent", "disabled:border-transparent", "disabled:border-transparent"])}
        // border Width
        ${valueByType(type, ["border-[1px]", "border-[1px]", "border-[1px]", "border-[0px]", "border-[0px]", "border-[0px]", "border-[0px]"])}
        // Paddings
        ${
          icon || type === "linkGray" || type === "linkColor"
            ? "p-0"
            : `
        ${valueBySize(size, ["px-[12px]", "px-[12px]", "px-[16px]", "px-[16px]", "px-[20px]"])}
        ${valueBySize(size, ["py-[8px]", "py-[10px]", "py-[10px]", "py-[12px]", "py-[16px]"])}
    `
        }
        // Typo
        ${valueBySize(size, ["text-sm-sb", "text-sm-sb", "text-md-sb", "text-sm-sb", "text-lg-sb"])}
        // height
        ${
          type === "linkGray" || type === "linkColor"
            ? "h-fit"
            : `
        ${valueBySize(size, ["h-[36px]", "h-[40px]", "h-[44px]", "h-[48px]", "h-[60px]"])}`
        }
        // Text Color
        ${valueByType(type, ["text-base-white", "text-gray-700", "text-brand-700", "text-gray-600", "text-brand-700", "text-gray-600", "text-brand-700"])}
        ${valueByType(type, ["hover:text-base-white", "hover:text-gray-800", "hover:text-brand-800", "hover:text-gray-700", "hover:text-brand-800", "hover:text-gray-700", "hover:text-brand-800"])}
        ${valueByType(type, ["disabled:text-gray-400", "disabled:text-gray-400", "disabled:text-gray-400", "disabled:text-gray-400", "disabled:text-gray-400", "disabled:text-gray-400", "disabled:text-gray-400"])}
        `}
    >
      {icon ? (
        <FontAwesomeIcon
          icon={icon}
          fontSize={valueBySize(size, ["16px", "16px", "16px", "16px", "20px"])}
          {...(typeof iconProps === "object" ? iconProps : {})}
        />
      ) : (
        <>
          {isLoading ? (
            <FontAwesomeIcon
              spin={true}
              icon={faSpinner}
              fontSize={valueBySize(size, [
                "16px",
                "16px",
                "16px",
                "16px",
                "20px",
              ])}
              {...(typeof lIconProps === "object" ? lIconProps : {})}
            />
          ) : (
            lIcon && (
              <FontAwesomeIcon
                icon={isLoading ? faSpinner : lIcon}
                fontSize={valueBySize(size, [
                  "16px",
                  "16px",
                  "16px",
                  "16px",
                  "20px",
                ])}
                {...(typeof lIconProps === "object" ? lIconProps : {})}
              />
            )
          )}
          {dot && (
            <div
              className={`
              ${
                disabled
                  ? "bg-gray-300"
                  : `
                ${valueByType(type, ["bg-base-white", "bg-success-500", "bg-success-500", "bg-success-500", "bg-success-500", "bg-success-500", "bg-success-500"])}
                `
              } 
                w-[8px] aspect-square rounded-full  mr-[6px]
                group-aria-disabled:
            `}
            />
          )}
          {children}
          {rIcon && (
            <FontAwesomeIcon
              icon={rIcon}
              fontSize={valueBySize(size, [
                "16px",
                "16px",
                "16px",
                "16px",
                "20px",
              ])}
              {...(typeof rIconProps === "object" ? rIconProps : {})}
            />
          )}
        </>
      )}
    </button>
  );
}

export default SButton;
