import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { Product } from "@/types/product"

type Props = {
  open: boolean
  initial?: Product | null
  onClose: () => void
  onSubmit: (data: Partial<Product>) => Promise<void> | void
}

type Errors = {
  product_name?: string
  product_price?: string
  brand?: string
  product_image_url?: string
}

export default function ProductFormDialog({
  open,
  initial,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<Partial<Product>>({})
  const [errors, setErrors] = useState<Errors>({})
  const [saving, setSaving] = useState(false)


  useEffect(() => {
    if (initial) {
      setForm(initial)
    } else {
      setForm({})
    }
    setErrors({})
  }, [initial, open])


  const validate = (): boolean => {
    const err: Errors = {}

    if (!form.product_name || form.product_name.trim().length < 3) {
      err.product_name = "Name must be at least 3 characters"
    }

    if (
      form.product_price === undefined ||
      isNaN(Number(form.product_price)) ||
      Number(form.product_price) <= 0
    ) {
      err.product_price = "Price must be a number greater than 0"
    }

    if (!form.brand || form.brand.trim() === "") {
      err.brand = "Brand is required"
    }

    if (!form.product_image_url || form.product_image_url.trim() === "") {
      err.product_image_url = "Image URL is required"
    }

    setErrors(err)
    return Object.keys(err).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return

    try {
      setSaving(true)
      await onSubmit(form)
      onClose()
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {initial ? "Edit Product" : "Create Product"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
 
          <div>
            <Label className="mb-2">Name *</Label>
            <Input
              value={form.product_name ?? ""}
              onChange={(e) =>
                setForm({ ...form, product_name: e.target.value })
              }
            />
            {errors.product_name && (
              <p className="text-xs text-red-600 mt-1">
                {errors.product_name}
              </p>
            )}
          </div>


          <div>
            <Label className="mb-2">Price *</Label>
            <Input
              type="number"
              min={1}
              value={form.product_price ?? ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  product_price: Number(e.target.value),
                })
              }
            />
            {errors.product_price && (
              <p className="text-xs text-red-600 mt-1">
                {errors.product_price}
              </p>
            )}
          </div>

          {/* BRAND */}
          <div>
            <Label className="mb-2">Brand *</Label>
            <Input
              value={form.brand ?? ""}
              onChange={(e) =>
                setForm({ ...form, brand: e.target.value })
              }
            />
            {errors.brand && (
              <p className="text-xs text-red-600 mt-1">
                {errors.brand}
              </p>
            )}
          </div>

          {/* IMAGE */}
          <div>
            <Label className="mb-2">Image URL *</Label>
            <Input
              value={form.product_image_url ?? ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  product_image_url: e.target.value,
                })
              }
            />
            {errors.product_image_url && (
              <p className="text-xs text-red-600 mt-1">
                {errors.product_image_url}
              </p>
            )}
          </div>

          {/* INFO */}
          <div>
            <Label className="mb-2">Product Info</Label>
            <Input
              value={form.product_info ?? ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  product_info: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label className="mb-2">Official PDP URL</Label>
            <Input
              value={form.real_pdp_url ?? ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  real_pdp_url: e.target.value,
                })
              }
            />
          </div>

          <Button
            className="w-full"
            disabled={saving}
            onClick={handleSubmit}
          >
            {saving ? "Saving..." : "Save Product"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
