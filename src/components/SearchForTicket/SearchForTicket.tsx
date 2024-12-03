import React, { useState } from "react";
import SButton from "@/design-components/SButton/SButton";
import SInput from "@/design-components/SInput/SInput";
import { faCalendarAlt, faUser, faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SearchForTicket() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departure: "",
    return: "",
    guests: 1,
  });

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-[16px] bg-white p-[16px] rounded-[8px] shadow-violet-700 border-violet-700 border-[2px]">

      <SInput
        placeholder="ქუთაისის აეროპორტი"
        value={formData.from}
        onChange={(e) => handleInputChange("from", e.target.value)}
        className="flex-1 w-full md:w-auto"
      />
      <FontAwesomeIcon icon={faExchangeAlt} className="text-gray-500" />

      <SInput
        placeholder="ტურიზმის ცენტრი"
        value={formData.to}
        onChange={(e) => handleInputChange("to", e.target.value)}
        className="flex-1 w-full md:w-auto"
      />

      <SInput
        placeholder="გასვლა"
        value={formData.departure}
        type="date"
        onChange={(e) => handleInputChange("departure", e.target.value)}
        rightAdditionalContent={
          <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500" />
        }
        className="flex-1 w-full md:w-auto"
      />

      {/* Return Input */}
      <SInput
        placeholder="დაბრუნება"
        value={formData.return}
        type="date"
        onChange={(e) => handleInputChange("return", e.target.value)}
        rightAdditionalContent={
          <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500" />
        }
        className="flex-1 w-full md:w-auto "
      />


      {/* Guests Input */}
      <SInput
        placeholder="1"
        value={String(formData.guests)}
        type="number"
        onChange={(e) => handleInputChange("guests", e.target.value)}
        rightAdditionalContent={
          <FontAwesomeIcon icon={faUser} className="text-gray-500" />
        }
        className="w-full md:w-[80px]"
      />

      {/* Search Button */}
      <SButton
        type="secondaryColor"
        size="xl"
        onClick={() => console.log("Search clicked", formData)}
        className="w-full md:w-auto px-[16px] py-[8px]"
        children="ძიება"
      />
    </div>
  );
}

export default SearchForTicket;
