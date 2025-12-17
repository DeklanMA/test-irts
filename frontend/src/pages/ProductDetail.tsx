import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/api/axios";
import type { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Heart, ExternalLink } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@/components/ui/spinner";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, toggleFavorite, isFavorite } = useCart();
  const { auth } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadProduct = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products/${id}`);
        if (mounted) setProduct(res.data.data);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadProduct();

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <Spinner className="w-10 h-10" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-32 text-gray-500">Product not found</div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
   
        <Card className="p-6 flex items-center justify-center">
          <img
            src={product.product_image_url}
            alt={product.product_name}
            className="max-h-[420px] object-contain"
          />
        </Card>


        <div className="space-y-5">
          <Badge
            variant="secondary"
            className="bg-blue-500 text-white dark:bg-blue-600">
            {product.brand || "No Brand"}
          </Badge>

          <h1 className="text-3xl font-bold leading-tight">
            {product.product_name}
          </h1>

          <p className="text-3xl font-extrabold text-blue-700">
            Rp {product.product_price.toLocaleString("id-ID")}
          </p>

          <Separator />

          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.product_info ||
                `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.`}
            </p>
          </div>

          <Separator />


          {!auth.token ? (
            <Button className="w-full h-12" disabled>
              Login to order
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button
                variant={isFavorite(product.id) ? "default" : "outline"}
                size="icon"
                onClick={() => toggleFavorite(product)}>
                <Heart
                  className={`w-5 h-5 ${
                    isFavorite(product.id) ? "fill-white" : ""
                  }`}
                />
              </Button>

              <Button
                className="flex-1 h-12 cursor-pointer"
                onClick={() => addToCart(product)}>
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            </div>
          )}

          {product.real_pdp_url && (
            <a
              href={product.real_pdp_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline">
              Official Product Page
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
