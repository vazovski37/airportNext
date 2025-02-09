"use client";

import React, { useEffect, useState } from "react";
import { useLocations } from "@/hooks/useLocations";
import STable from "@/design-components/STable/STable";
import SButton from "@/design-components/SButton/SButton";
import { ILocation } from "@/interfaces/location";

const LocationsAdminPanel = () => {
  const { 
    locations, 
    loading, 
    error, 
    addLocation, 
    updateExistingLocation, 
    deleteLocation, 
    loadLocations
  } = useLocations();

  const [locationName, setLocationName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [updatedLocation, setUpdatedLocation] = useState("");

  useEffect(() => {
    loadLocations();
  }, []);

  const handleAddLocation = async () => {
    if (!locationName.trim()) return;
    await addLocation(locationName.trim());
    setLocationName("");
  };

  const handleSaveUpdate = async (id: number) => {
    if (!updatedLocation.trim()) return;
    await updateExistingLocation(id, updatedLocation.trim());
    setEditingId(null);
  };
  

  const handleSearch = async () => {
    await loadLocations(searchQuery.trim());
  };

  const columns = [
    { label: "ID", accessor: "id" },
    { 
      label: "Location Name", 
      accessor: "location_name", 
      render: (location:ILocation) => 
        editingId === location.id ? (
          <input
            type="text"
            value={updatedLocation}
            onChange={(e) => setUpdatedLocation(e.target.value)}
            className="p-2 border rounded-md w-full"
          />
        ) : (
          location.location_name
        ),
    },
    {
      label: "Actions",
      accessor: "actions",
      render: (location:ILocation) =>
        editingId === location.id ? (
          <div className="flex gap-2">
            <SButton onClick={() => handleSaveUpdate(location.id)} type="primary" size="sm">
              ✅ Save
            </SButton>
            <SButton onClick={() => setEditingId(null)} type="secondaryGray" size="sm">
              ❌ Cancel
            </SButton>
          </div>
        ) : (
          <div className="flex gap-2">
            <SButton
              onClick={() => {
                setEditingId(location.id);
                setUpdatedLocation(location.location_name);
              }}
              type="tertiaryColor"
              size="sm"
            >
              ✏️ Edit
            </SButton>
            <SButton onClick={() => deleteLocation(location.id)} type="secondaryColor" size="sm">
              🗑️ Delete
            </SButton>
          </div>
        ),
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Manage Locations</h2>

      {/* Add Location Form */}
      <div className="bg-white p-4 shadow-md rounded-lg mb-6 flex items-center gap-4">
        <input
          type="text"
          placeholder="New Location"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
          className="p-2 border rounded-md flex-1"
        />
        <SButton onClick={handleAddLocation} type="primary" size="md">
          ➕ Add Location
        </SButton>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 shadow-md rounded-lg mb-6 flex items-center gap-4">
        <input
          type="text"
          placeholder="Search Locations"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-md flex-1"
        />
        <SButton onClick={handleSearch} type="secondaryGray" size="md">
          🔍 Search
        </SButton>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Locations Table */}
      <STable
        isLoading={loading}
        data={locations}
        emptyMessage="No locations found."
        columns={columns}
      />
    </div>
  );
};

export default LocationsAdminPanel;
