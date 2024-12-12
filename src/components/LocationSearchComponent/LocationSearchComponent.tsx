import React, { useState } from "react";
import useSearchLocations from "@/hooks/useSearchLocations";
import SInput from "@/design-components/SInput/SInput";
import { ILocation } from "@/interfaces/location";

interface LocationSearchComponentProps {
  onSelect: (location: ILocation) => void;
}

const LocationSearchComponent: React.FC<LocationSearchComponentProps> = ({ onSelect }) => {
  const { locations, loading, error, search } = useSearchLocations();
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setShowDropdown(!!newQuery.trim());
    search(newQuery);
  };

  const handleLocationSelect = (location: ILocation) => {
    onSelect(location); // Pass the selected location to the parent
    setQuery(location.location_name);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <SInput
        placeholder="Search for a location..."
        value={query}
        onChange={handleInputChange}
        className="w-full"
      />

      {showDropdown && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          {loading && <div className="p-4 text-center text-gray-500">Loading...</div>}
          {error && <div className="p-4 text-center text-red-500">{error}</div>}
          {locations?.length ? (
            <ul className="divide-y divide-gray-200">
              {locations.map((loc) => (
                <li
                  key={loc.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleLocationSelect(loc)}
                >
                  {loc.location_name}
                </li>
              ))}
            </ul>
          ) : (
            !loading && <div className="p-4 text-center text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationSearchComponent;
