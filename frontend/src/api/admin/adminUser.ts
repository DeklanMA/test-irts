import api from "@/api/axios"
import type { User } from "@/types/user"

export const getAdminUsers = (page = 1, limit = 10) =>
  api.get(`/admin/users?page=${page}&limit=${limit}`)

export const createUser = (data: Partial<User> & { password?: string }) =>
  api.post("/admin/users", data)

export const updateUser = (
  id: number,
  data: Partial<User> & { password?: string }
) => api.put(`/admin/users/${id}`, data)

export const deleteUser = (id: number) =>
  api.delete(`/admin/users/${id}`)
