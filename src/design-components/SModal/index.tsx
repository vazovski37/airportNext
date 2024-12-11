import { faCheckCircle } from "@fortawesome/pro-regular-svg-icons";
import { faX } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import React, { useEffect } from "react";
import SButton from "../SButton";
import SInput, { ISInputProps } from "../SInput";

type ModalType = "success" | "warning" | "error";

interface ISModal {
  isOpen: boolean;
  setIsOpen: (b: boolean) => void;
  pannelClassName?: string;
  type: ModalType;
  withInput?: boolean;
  inputProps?: ISInputProps;
  handleCancel: () => void;
  handleSubmit: () => void;
  title: string;
  subtitle: string;
}

const valueByType = (type: ModalType, arr: string[]) => {
  //
  switch (type) {
    case "success":
      return arr[0];
      break;
    case "warning":
      return arr[1];
      break;
    case "error":
      return arr[2];
      break;
  }
};

function SModal({
  withInput = false,
  pannelClassName,
  type,
  isOpen,
  setIsOpen,
  inputProps,
  handleCancel,
  handleSubmit,
  subtitle,
  title,
}: ISModal) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="bg-[rgba(0,0,0,0.4)] fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          className={`${pannelClassName} rounded-[12px] relative max-w-[400px] bg-base-white shadow-xl p-[24px]`}
        >
          <FontAwesomeIcon
            onClick={() => setIsOpen(false)}
            icon={faX}
            fontSize={"14px"}
            className="text-gray-400 absolute top-[24px] right-[24px] cursor-pointer"
          />
          <div
            className={`w-[48px] h-[48px] flex justify-center items-center bg-success-100 
            border-[8px] rounded-full
            ${valueByType(type, ["border-success-50", "border-warning-50", "border-error-50"])}
            ${valueByType(type, ["bg-success-100", "bg-warning-100", "bg-error-100"])}
          `}
          >
            <FontAwesomeIcon
              icon={faCheckCircle}
              fontSize={"18px"}
              className={`${valueByType(type, ["text-success-600", "text-warning-600", "text-error-600"])}`}
            />
          </div>
          <p className="text-lg-sb text-gray-900 mt-[16px]">{title}</p>
          <p className="mt-[4px] text-sm text-gray-600">{subtitle}</p>
          {withInput && <SInput className="mt-[12px]" {...inputProps} />}
          <div
            className={`flex gap-[12px] ${withInput ? "mt-[12px]" : "mt-[32px]"}`}
          >
            <SButton
              onClick={handleCancel}
              className="w-full"
              type="secondaryGray"
              size="lg"
            >
              Cancel
            </SButton>
            <SButton onClick={handleSubmit} className="w-full" size="lg">
              Confirm
            </SButton>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default SModal;
