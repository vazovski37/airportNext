"use client";

import React, { useEffect, useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import STable from "@/design-components/STable/STable";
import SButton from "@/design-components/SButton/SButton";
import SBadge from "@/design-components/SBadge/SBadge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faCheck, faTimes, faFilter } from "@fortawesome/free-solid-svg-icons";

const UsersAdminPanel = () => {
  const { users, loading, error, loadUsers, updateUserRole, deleteUser } = useUsers();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const handleFilter = () => {
    loadUsers(searchQuery, selectedRole);
  };

  const handleSaveRole = async (id: number) => {
    if (newRole) {
      await updateUserRole(id, newRole);
      setEditingId(null);
    }
  };

  const columns = [
    { label: "Name", accessor: "name", render: (row: any) => `${row.first_name} ${row.last_name}` },
    { label: "Email", accessor: "email" },
    {
      label: "Role",
      accessor: "role",
      render: (row: any) =>
        editingId === row.id ? (
          <select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="passenger">Passenger</option>
            <option value="driver">Driver</option>
            <option value="agent">Agent</option>
            <option value="admin">Admin</option>
          </select>
        ) : (
          <SBadge size="sm" color="gray">{row.role}</SBadge>
        ),
    },
    {
      label: "Actions",
      accessor: "actions",
      render: (row: any) =>
        editingId === row.id ? (
          <div className="flex gap-2">
            <SButton onClick={() => handleSaveRole(row.id)} type="primary" size="sm">
              <FontAwesomeIcon icon={faCheck} className="mr-1" /> Save
            </SButton>
            <SButton onClick={() => setEditingId(null)} type="secondaryGray" size="sm">
              <FontAwesomeIcon icon={faTimes} className="mr-1" /> Cancel
            </SButton>
          </div>
        ) : (
          <div className="flex gap-2">
            <SButton
              onClick={() => {
                setEditingId(row.id);
                setNewRole(row.role);
              }}
              type="secondaryColor"
              size="sm"
            >
              <FontAwesomeIcon icon={faEdit} className="mr-1" /> Edit
            </SButton>
            <SButton onClick={() => deleteUser(row.id)} type="secondaryGray" size="sm">
              <FontAwesomeIcon icon={faTrash} className="mr-1" /> Delete
            </SButton>
          </div>
        ),
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Manage Users</h2>

      {/* 🔍 Search & Filter */}
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search user..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-md flex-1"
        />
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">All Roles</option>
          <option value="passenger">Passenger</option>
          <option value="driver">Driver</option>
          <option value="agent">Agent</option>
          <option value="admin">Admin</option>
        </select>
        <SButton onClick={handleFilter} type="primary" size="sm">
          <FontAwesomeIcon icon={faFilter} className="mr-1" /> Filter
        </SButton>
      </div>

      {/* 🔴 Error Message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* 📊 User Table */}
      <STable data={users} columns={columns} isLoading={loading} emptyMessage="No users found." />
    </div>
  );
};

export default UsersAdminPanel;
