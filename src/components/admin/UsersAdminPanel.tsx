"use client";

import React, { useState } from "react";

const UsersAdminPanel = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>

      <input
        type="text"
        placeholder="Search user by name or email..."
        className="w-full p-2 border rounded-md mb-4"
        value={searchQuery}
        onChange={handleSearch}
      />

      {/* Display list of users (Replace with API data) */}
      <div className="bg-white p-4 shadow rounded-lg">
        <p>User List Goes Here...</p>
      </div>
    </div>
  );
};

export default UsersAdminPanel;
