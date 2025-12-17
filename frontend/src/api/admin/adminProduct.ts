import api from "@/api/axios"
import { Product } from "@/types/product"

export const getAdminProducts = (page = 1, limit = 10) =>
  api.get(`/admin/products?page=${page}&limit=${limit}`)

export const createProduct = (data: Partial<Product>) =>
  api.post("/admin/products", data)

export const updateProduct = (id: number, data: Partial<Product>) =>
  api.put(`/admin/products/${id}`, data)

export const deleteProduct = (id: number) =>
  api.delete(`/admin/products/${id}`)
