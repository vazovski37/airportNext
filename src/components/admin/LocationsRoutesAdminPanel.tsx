"use client";

import React, { useEffect, useState } from "react";
import { useLocations } from "@/hooks/useLocations";
import { useRoutes } from "@/hooks/useRoutes";
import STable from "@/design-components/STable/STable";
import SButton from "@/design-components/SButton/SButton";
import SInput from "@/design-components/SInput/SInput";
import { ILocation } from "@/interfaces/location";
import { IRoute } from "@/interfaces/route";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faCheck,
  faTimes,
  faMapMarkerAlt,
  faRoad,
  faDollarSign,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const LocationsRoutesAdminPanel = () => {
  /** 📍 Locations State */
  const {
    locations,
    loading: locationsLoading,
    error: locationsError,
    addLocation,
    updateExistingLocation,
    deleteLocation,
    loadLocations,
  } = useLocations();
  const [locationName, setLocationName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingLocationId, setEditingLocationId] = useState<number | null>(null);
  const [updatedLocation, setUpdatedLocation] = useState("");

  /** 🚏 Routes State */
  const {
    routes,
    loading: routesLoading,
    error: routesError,
    createRoute,
    updateRoute,
    deleteRoute,
    loadRoutes,
  } = useRoutes();
  const [editingRouteId, setEditingRouteId] = useState<number | null>(null);
  const [newRoute, setNewRoute] = useState({
    departure_id: 0,
    destination_id: 0,
    price: 0,
    ride_time: 0,
  });

  useEffect(() => {
    loadLocations();
    loadRoutes();
  }, []);

  /** 📍 Location Functions */
  const handleAddLocation = async () => {
    if (!locationName.trim()) return;
    await addLocation(locationName.trim());
    setLocationName("");
  };

  const handleSaveLocationUpdate = async (id: number) => {
    if (!updatedLocation.trim()) return;
    await updateExistingLocation(id, updatedLocation.trim());
    setEditingLocationId(null);
  };

  /** 🚏 Route Functions */
  const handleAddRoute = async () => {
    if (!newRoute.departure_id || !newRoute.destination_id || !newRoute.price || !newRoute.ride_time) return;

    await createRoute({
      departure_id: Number(newRoute.departure_id),
      destination_id: Number(newRoute.destination_id),
      price: Number(newRoute.price),
      ride_time: Number(newRoute.ride_time),
    });

    setNewRoute({ departure_id: 0, destination_id: 0, price: 0, ride_time: 0 });
  };

  /** 🔹 Table Columns */
  const locationColumns = [
    { label: "ID", accessor: "id" },
    {
      label: "Location Name",
      accessor: "location_name",
      render: (location: ILocation) =>
        editingLocationId === location.id ? (
          <SInput
            value={updatedLocation}
            onChange={(e) => setUpdatedLocation(e.target.value)}
            placeholder="Edit location name"
          />
        ) : (
          location.location_name
        ),
    },
    {
      label: "Actions",
      accessor: "actions",
      render: (location: ILocation) =>
        editingLocationId === location.id ? (
          <div className="flex gap-2">
            <SButton onClick={() => handleSaveLocationUpdate(location.id)} type="primary" size="sm">
              <FontAwesomeIcon icon={faCheck} className="mr-1" /> Save
            </SButton>
            <SButton onClick={() => setEditingLocationId(null)} type="secondaryGray" size="sm">
              <FontAwesomeIcon icon={faTimes} className="mr-1" /> Cancel
            </SButton>
          </div>
        ) : (
          <div className="flex gap-2">
            <SButton
              onClick={() => {
                setEditingLocationId(location.id);
                setUpdatedLocation(location.location_name);
              }}
              type="secondaryColor"
              size="sm"
            >
              <FontAwesomeIcon icon={faEdit} className="mr-1" /> Edit
            </SButton>
            <SButton onClick={() => deleteLocation(location.id)} type="secondaryGray" size="sm">
              <FontAwesomeIcon icon={faTrash} className="mr-1" /> Delete
            </SButton>
          </div>
        ),
    },
  ];

  const routeColumns = [
    { label: "ID", accessor: "id" },
    { label: "Departure", accessor: "departure_id" },
    { label: "Destination", accessor: "destination_id" },
    { label: "Price", accessor: "price" },
    { label: "Ride Time (min)", accessor: "ride_time" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 📍 Locations Section */}
      <div className="bg-white p-4 shadow-md rounded-lg">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Manage Locations</h2>
        <SInput icon={faMapMarkerAlt} placeholder="New Location" value={locationName} onChange={(e) => setLocationName(e.target.value)} />
        <SButton onClick={handleAddLocation} type="primary" className="mt-2">
          <FontAwesomeIcon icon={faPlus} className="mr-1" /> Add Location
        </SButton>
        <STable isLoading={locationsLoading} data={locations} emptyMessage="No locations found." columns={locationColumns} />
      </div>

      {/* 🚏 Routes Section */}
      <div className="bg-white p-4 shadow-md rounded-lg">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Manage Routes</h2>

        {/* 🆕 Add Route Form */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm mb-4">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Add New Route</h3>
          <div className="grid grid-cols-2 gap-2">
            <SInput
              icon={faRoad}
              placeholder="Departure ID"
              value={newRoute.departure_id.toString()}
              onChange={(e) => setNewRoute({ ...newRoute, departure_id: Number(e.target.value) })}
            />
            <SInput
              icon={faRoad}
              placeholder="Destination ID"
              value={newRoute.destination_id.toString()}
              onChange={(e) => setNewRoute({ ...newRoute, destination_id: Number(e.target.value) })}
            />
            <SInput
              icon={faDollarSign}
              placeholder="Price"
              value={newRoute.price.toString()}
              onChange={(e) => setNewRoute({ ...newRoute, price: Number(e.target.value) })}
            />
            <SInput
              icon={faClock}
              placeholder="Ride Time (min)"
              value={newRoute.ride_time.toString()}
              onChange={(e) => setNewRoute({ ...newRoute, ride_time: Number(e.target.value) })}
            />
          </div>
          <SButton onClick={handleAddRoute} type="primary" className="mt-2">
            <FontAwesomeIcon icon={faPlus} className="mr-1" /> Add Route
          </SButton>
        </div>

        {/* 📊 Routes Table */}
        <STable isLoading={routesLoading} data={routes} emptyMessage="No routes found." columns={routeColumns} />
      </div>
    </div>
  );
};

export default LocationsRoutesAdminPanel;
