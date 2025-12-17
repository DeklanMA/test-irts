import api from "@/api/axios"

export const getMe = () => api.get("/me")

export const updateProfile = (data: {
  name: string
  email: string
  password?: string
}) => api.put("/profile", data)
