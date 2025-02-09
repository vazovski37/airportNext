import { useEffect, useState } from "react";
import { fetchUsers, updateUserRoleApi, deleteUserApi } from "@/services/userService";
import { IUser } from "@/interfaces/auth";

export const useUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async (searchQuery = "", role = "") => {
    setLoading(true);
    try {
      const data = await fetchUsers(searchQuery, role);
      setUsers(data);
      setError(null);
    } catch (err) {
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (id: number, role: string) => {
    try {
      await updateUserRoleApi(id, role);
      setUsers((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, role } : user
        )
      );
    } catch {
      setError("Failed to update user role.");
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await deleteUserApi(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch {
      setError("Failed to delete user.");
    }
  };

  return { users, loading, error, loadUsers, updateUserRole, deleteUser };
};
