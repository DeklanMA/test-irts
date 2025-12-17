/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import axios from "axios"

import {
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/api/admin/adminProduct"

import { Product } from "@/types/product"
import ProductTable from "@/components/admin/ProductTable"
import ProductFormDialog from "@/components/admin/ProductFormDialog"
import Pagination from "@/components/Pagination"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [openForm, setOpenForm] = useState(false)
  const [editData, setEditData] = useState<Product | null>(null)

  const loadData = async () => {
    setLoading(true)
    try {
      const res = await getAdminProducts(page, 10)
      setProducts(res.data.data)
      setTotalPages(res.data.meta.total_pages)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.error || "Failed to load products")
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


  const handleSubmit = async (data: Partial<Product>) => {
    try {
      if (editData) {
        await updateProduct(editData.id, data)
        toast.success("Product updated successfully")
      } else {
        await createProduct(data)
        toast.success("Product created successfully")
      }

      setOpenForm(false)
      setEditData(null)
      loadData()
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.error || "Failed to save product")
      } else {
        toast.error("Unexpected error")
      }
    }
  }


  const handleDelete = async (id: number) => {
    if (!confirm("Delete this product?")) return

    try {
      await deleteProduct(id)
      toast.success("Product deleted")
      loadData()
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.error || "Failed to delete product")
      } else {
        toast.error("Unexpected error")
      }
    }
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Products</h1>
        <Button
        className="cursor-pointer"
          onClick={() => {
            setEditData(null)
            setOpenForm(true)
          }}
        >
          + Add Product
        </Button>
      </div>
      {loading ? (
        <div className="flex justify-center py-20">
          <Spinner className="w-10 h-10" />
        </div>
      ) : (
        <>
          <ProductTable
            products={products}
            onEdit={(p) => {
              setEditData(p)
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

   
      <ProductFormDialog
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
