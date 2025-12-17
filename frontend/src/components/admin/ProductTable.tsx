import { Product } from "@/types/product"
import { Button } from "@/components/ui/button"
import { Pencil, Trash } from "lucide-react"

type Props = {
  products: Product[]
  onEdit: (p: Product) => void
  onDelete: (id: number) => void
}

export default function ProductTable({
  products,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Image</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2">Brand</th>
            <th className="p-2">Price</th>
            <th className="p-2">Info</th>
            <th className="p-2 w-32">Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-2">
                <img
                  src={p.product_image_url}
                  alt={p.product_name.charAt(0).toUpperCase()}
                  className="w-16 h-16 object-contain rounded flex items-center justify-center bg-white border"
                />
              </td>

              <td className="p-2 font-medium">
                {p.product_name}
              </td>

              <td className="text-center">{p.brand}</td>

              <td className="text-center">
                Rp {p.product_price.toLocaleString("id-ID")}
              </td>

              <td className="text-center text-xs text-gray-500">
                {p.product_info}
              </td>

              <td className="flex gap-2 justify-center p-2">
                <Button
                  size="icon"
                  className="cursor-pointer"
                  variant="outline"
                  onClick={() => onEdit(p)}
                >
                  <Pencil size={16} />
                </Button>

                <Button
                  size="icon"
                  className="cursor-pointer"
                  variant="destructive"
                  onClick={() => onDelete(p.id)}
                >
                  <Trash size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
