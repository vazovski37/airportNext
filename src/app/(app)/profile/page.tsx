"use client";
import TicketContainer from "@/containers/TicketContainer";
import UserInfoContainer from "@/containers/UserInfoContainer";
import SDropdownMenu, { IDropdownMenuItem } from "@/design-components/SDropdownMenu/SDropdownMenu";
import SPopup from "@/design-components/SPopup/SPopup";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import SButton from "@/design-components/SButton/SButton"; // Import SButton

export default function Profile() {
  const [popupConfig, setPopupConfig] = useState({
    isOpen: false,
    title: "",
    placeholder: "",
    confirmText: "",
    type: "name" as "password" | "name",
    onConfirm: (value: string) => {},
  });

  const openPopup = (title: string, placeholder: string, confirmText: string, type: "password" | "name", onConfirm: (value: string) => void) => {
    setPopupConfig({ isOpen: true, title, placeholder, confirmText, type, onConfirm });
  };

  const closePopup = () => {
    setPopupConfig((prev) => ({ ...prev, isOpen: false }));
  };

  const dropdownItems: IDropdownMenuItem[] = [
    {
      title: "Change Name",
      handleClick: () =>
        openPopup("Change Name", "", "Save", "name", (value) => {
          console.log("New Name:", value);
          closePopup();
        }),
    },
    {
      title: "Change Password",
      handleClick: () =>
        openPopup("Change Password", "Enter New Password", "Update", "password", (value) => {
          console.log("New Password:", value);
          closePopup();
        }),
    },
  ];

  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-300 min-h-screen flex flex-col md:flex-row gap-8 p-8 md:p-12">
      {/* Left: Profile Container */}
      <div className="relative bg-white shadow-md rounded-xl p-8 flex flex-col justify-center items-center w-full md:w-[450px] h-1/2 border border-gray-200">
        {/* Dropdown Button */}
        <div className="absolute top-4 right-4">
          <SDropdownMenu
            menuButton={
              <SButton
                icon={faCog}
                size="sm"
                type="secondaryGray"
                className="p-2"
              />
            }
            items={dropdownItems}
          />
        </div>

        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center tracking-wide">User Profile</h1>
        <UserInfoContainer />
      </div>

      {/* Right: User Tickets */}
      <div className="bg-white shadow-md rounded-xl p-8 flex flex-col w-full md:flex-grow border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Tickets</h2>
        <TicketContainer type={"userPurchasedTickets"} />
      </div>

      {/* Popup Component */}
      <SPopup {...popupConfig} onClose={closePopup} />
    </div>
  );
}
