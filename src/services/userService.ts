import { apiGet, apiPut, apiDelete } from "@/utils/axiosInstance";
import { IUser } from "@/interfaces/auth";

export const fetchUsers = async (search: string, role: string): Promise<IUser[]> => {
  const queryParams = new URLSearchParams();
  if (search) queryParams.append("search", search);
  if (role) queryParams.append("role", role);
  const response = await apiGet(`/api/users?${queryParams.toString()}`);
  return response;
};

export const updateUserRoleApi = async (id: number, role: string): Promise<void> => {
  await apiPut(`/api/users/${id}`, { role });
};

export const deleteUserApi = async (id: number): Promise<void> => {
  await apiDelete(`/api/users/${id}`);
};
