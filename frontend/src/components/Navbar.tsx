import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  const { auth, logout } = useAuth();
  const { cart } = useCart();

  const isAdmin = auth.role === "admin";
  const isCustomer = auth.role === "customer";

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav
      className={`
        sticky z-40 transition-all
        ${
          isAdmin
            ? "bg-white text-black px-6 py-4 w-full top-0 border-b border-gray-200"
            : "bg-blue-800 text-white max-w-4xl mx-auto mt-10 top-10 rounded-3xl p-5"
        }
      `}>
      <div className="flex justify-between items-center">
        <b
          className={`text-lg font-bold ${
            isAdmin ? "opacity-0 text-white" : "text-white"
          }`}>
          IRTS Store
        </b>
        {!isAdmin && (
          <div className="flex gap-5">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/products" className="hover:underline">
              Products
            </Link>
            <Link to="/#" className="hover:underline">
              Categories
            </Link>
            <Link to="/#" className="hover:underline">
              Rewards
            </Link>
          </div>
        )}
        {!auth.token ? (
          <div className="flex gap-3">
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {isCustomer && (
              <Link to="/checkout" className="relative">
                <ShoppingCart className="w-5 h-5" />

                {cartCount > 0 && (
                  <span
                    className="
                      absolute -top-2 -right-2
                      min-w-[18px] h-[18px]
                      rounded-full
                      bg-red-600 text-white
                      text-[11px] font-bold
                      flex items-center justify-center
                      px-1
                    ">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer outline-none">
                <span className="text-sm font-medium">{auth.name}</span>

                <Avatar className="w-8 h-8 border border-white">
                  <AvatarImage
                    src="/avatar-default.png"
                    className="text-black"
                  />
                  <AvatarFallback className="text-black font-medium">
                    {auth.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>

                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin">Admin Dashboard</Link>
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem
                  className="text-red-600 cursor-pointer"
                  onClick={logout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </nav>
  );
}
