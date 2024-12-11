"use client";

import React, { useState } from "react";
import SButton from "@/design-components/SButton/SButton";
import SInput from "@/design-components/SInput/SInput";
import { faCalendarAlt, faUser, faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useSearchAvailableTickets from "@/hooks/useSearchAvailableTickets";
import LocationSearchComponent from "../LocationSearchComponent/LocationSearchComponent";

function SearchForTicket() {
  const { tickets, loading, error, search } = useSearchAvailableTickets();
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departure: "",
    guests: 1,
  });

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    search({
      departure_time: formData.departure,
      departure_location: formData.from,
      destination_location: formData.to,
    });
  };

  return (
    <div className="flex flex-col gap-[16px] bg-white p-[16px] rounded-[8px] shadow-violet-700 border-violet-700 border-[2px]">
      {/* Input Fields */}
      <div className="flex flex-col md:flex-row items-center gap-[16px]">
        <LocationSearchComponent />
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

        <SButton
          type="secondaryColor"
          size="xl"
          onClick={handleSearch}
          className="w-full md:w-auto px-[16px] py-[8px]"
        >
          ძიება
        </SButton>
      </div>

      {/* Search Results */}
      <div className="mt-[16px]">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {tickets && tickets.length > 0 ? (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="p-4 bg-gray-50 rounded-lg shadow border border-gray-300"
              >
                <p>
                  <strong>From:</strong> {ticket.departure_location}
                </p>
                <p>
                  <strong>To:</strong> {ticket.destination_location}
                </p>
                <p>
                  <strong>Departure Time:</strong> {ticket.departure_time}
                </p>
                <p>
                  <strong>Price:</strong> {ticket.price}
                </p>
              </div>
            ))}
          </div>
        ) : (
          !loading && <p>No tickets found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchForTicket;
