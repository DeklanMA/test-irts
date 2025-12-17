/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "sonner"

import {
  getAdminUsers,
  createUser,
  updateUser,
  deleteUser,
} from "@/api/admin/adminUser"

import { User } from "@/types/user"
import UserTable from "@/components/admin/UserTable"
import UserFormDialog from "@/components/admin/UserFormDialog"
import Pagination from "@/components/Pagination"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [openForm, setOpenForm] = useState(false)
  const [editData, setEditData] = useState<User | null>(null)


  const loadData = async () => {
    setLoading(true)
    try {
      const res = await getAdminUsers(page, 10)
      setUsers(res.data.data)
      setTotalPages(res.data.meta.total_pages)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.error || "Failed to load users")
      } else {
        toast.error("Unexpected error")
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [page])

  const handleSubmit = async (data: any) => {
    try {
      if (editData) {
        await updateUser(editData.id, data)
        toast.success("User updated successfully")
      } else {
        await createUser(data)
        toast.success("User created successfully")
      }

      setOpenForm(false)
      setEditData(null)
      loadData()
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.error || "Failed to save user")
      } else {
        toast.error("Unexpected error")
      }
    }
  }


  const handleDelete = async (id: number) => {
    if (!confirm("Delete this user?")) return

    try {
      await deleteUser(id)
      toast.success("User deleted")
      loadData()
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.error || "Failed to delete user")
      } else {
        toast.error("Unexpected error")
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Users</h1>
        <Button
          onClick={() => {
            setEditData(null)
            setOpenForm(true)
          }}
        >
          + Add User
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Spinner className="w-10 h-10" />
        </div>
      ) : (
        <>
          <UserTable
            users={users}
            onEdit={(u) => {
              setEditData(u)
              setOpenForm(true)
            }}
            onDelete={handleDelete}
          />

          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={setPage}
          />
        </>
      )}

      <UserFormDialog
        open={openForm}
        initial={editData}
        onClose={() => {
          setOpenForm(false)
          setEditData(null)
        }}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
