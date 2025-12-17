import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingBag, CreditCard } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Checkout() {
  const { cart } = useCart();

  const total = cart.reduce(
    (sum, i) => sum + i.product_price * i.qty,
    0
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <ShoppingBag className="w-7 h-7" />
        Checkout
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Your Order</CardTitle>
          </CardHeader>

          <CardContent>
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-10">
                Your cart is empty
              </p>
            ) : (
              <ScrollArea className="h-[320px] pr-4">
                <div className="space-y-4">
                  {cart.map(item => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium line-clamp-1">
                          {item.product_name}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>
                            Rp{" "}
                            {item.product_price.toLocaleString("id-ID")}
                          </span>
                          <Badge variant="secondary">
                            x{item.qty}
                          </Badge>
                        </div>
                      </div>

                      <p className="font-semibold">
                        Rp{" "}
                        {(item.product_price * item.qty).toLocaleString(
                          "id-ID"
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Summary
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>
                Rp {total.toLocaleString("id-ID")}
              </span>
            </div>

            <div className="flex justify-between text-sm text-gray-500">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <Separator />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-blue-700">
                Rp {total.toLocaleString("id-ID")}
              </span>
            </div>
          </CardContent>

          <CardFooter>
            <Button
              className="w-full text-lg h-12"
              disabled={cart.length === 0}
            >
              Place Order
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
