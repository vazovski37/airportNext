"use client";

import React, { useState, useEffect } from "react";
import SButton from "@/design-components/SButton/SButton";
import SInput from "@/design-components/SInput/SInput";
import { faCalendarAlt, faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useSearchAvailableTickets from "@/hooks/useSearchAvailableTickets";
import LocationSearchComponent from "../LocationSearchComponent/LocationSearchComponent";
import { ITicket } from "@/interfaces/ticket";

interface SearchForTicketProps {
  setTickets: (tickets: ITicket[] | null) => void;
}

function SearchForTicket({ setTickets }: SearchForTicketProps) {
  const { tickets, loading, error, search } = useSearchAvailableTickets();
  const [formData, setFormData] = useState({
    from: null,
    to: null,
    departure: "",
  });

  useEffect(() => {
    if (tickets) {
      setTickets(tickets); // Update tickets in the parent when the tickets state changes
    }
  }, [tickets, setTickets]);

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = async () => {
    await search({
      departure_time: formData.departure,
      departure_location: formData.from || "",
      destination_location: formData.to || "",
    });
  };

  return (
    <div className="flex flex-col gap-[16px] bg-white p-[16px] rounded-[8px] shadow-violet-700 border-violet-700 border-[2px]">
      <div className="flex flex-col md:flex-row items-center gap-[16px]">
        <LocationSearchComponent
          onSelect={(location) => handleInputChange("from", location.location_name)}
        />
        <FontAwesomeIcon icon={faExchangeAlt} className="text-gray-500" />
        <LocationSearchComponent
          onSelect={(location) => handleInputChange("to", location.location_name)}
        />

        <SInput
          placeholder="Departure"
          value={formData.departure}
          type="date"
          onChange={(e) => handleInputChange("departure", e.target.value)}
          rightAdditionalContent={
            <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500" />
          }
          className="flex-1 w-full md:w-auto"
        />

        <SButton
          type="secondaryColor"
          size="xl"
          onClick={handleSearch}
          className="w-full md:w-auto px-[16px] py-[8px]"
        >
          Search
        </SButton>
      </div>

      {loading && <div className="text-gray-500 mt-2">Searching...</div>}
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}

export default SearchForTicket;
