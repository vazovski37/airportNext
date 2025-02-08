"use client";

import React from "react";

const TimetableAdminPanel = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Timetable</h2>

      <button className="bg-orange-500 text-white px-4 py-2 rounded-md">Define Schedule</button>

      <div className="bg-white p-4 shadow rounded-lg mt-4">
        <p>Timetable List Goes Here...</p>
      </div>
    </div>
  );
};

export default TimetableAdminPanel;
