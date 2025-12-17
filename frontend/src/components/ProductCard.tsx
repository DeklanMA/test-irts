import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
import type { Product } from "@/types/product"

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const { addToCart, toggleFavorite, isFavorite } = useCart()
  const { auth } = useAuth()
  const navigate = useNavigate()

  const goToDetail = () => {
    navigate(`/products/${product.id}`)
  }

  return (
    <Card className="rounded-2xl hover:shadow-lg transition group">
      {/* CLICKABLE AREA */}
      <CardContent
        className="p-4 cursor-pointer"
        onClick={goToDetail}
      >
        <img
          src={product.product_image_url}
          alt={product.product_name}
          className="w-full h-40 object-contain mb-4 group-hover:scale-105 transition"
        />

        <h3 className="font-semibold line-clamp-2 group-hover:underline">
          {product.product_name}
        </h3>

        <p className="text-sm text-gray-500">{product.brand}</p>

        <p className="mt-2 font-bold text-blue-600">
          Rp {product.product_price.toLocaleString("id-ID")}
        </p>
      </CardContent>

      {/* ACTION BUTTONS */}
      <CardFooter className="flex gap-2">
        {!auth.token ? (
          <Button
            variant="outline"
            className="w-full"
            onClick={(e) => {
              e.stopPropagation()
              navigate("/login")
            }}
          >
            Login to Order
          </Button>
        ) : (
          <>
            <Button
              size="icon"
              variant={isFavorite(product.id) ? "default" : "outline"}
              onClick={(e) => {
                e.stopPropagation()
                toggleFavorite(product)
              }}
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorite(product.id) ? "fill-white" : ""
                }`}
              />
            </Button>

            <Button
              className="flex-1 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                addToCart(product)
              }}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
