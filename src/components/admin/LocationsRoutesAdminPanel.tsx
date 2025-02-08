"use client";

import React from "react";

const LocationsRoutesAdminPanel = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Locations & Routes</h2>

      <button className="bg-green-500 text-white px-4 py-2 rounded-md">Add Location</button>
      <button className="bg-purple-500 text-white px-4 py-2 rounded-md ml-4">Define Route</button>

      <div className="bg-white p-4 shadow rounded-lg mt-4">
        <p>Locations & Routes List Goes Here...</p>
      </div>
    </div>
  );
};

export default LocationsRoutesAdminPanel;
