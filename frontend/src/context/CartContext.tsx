/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "../types/product";
import { addFavorite, getFavorites } from "../api/favorite";
import type { Favorite } from "../types/favorite";
import api from "@/api/axios";
import { useAuth } from "./AuthContext";

type CartItem = Product & { qty: number };

type CartContextType = {
  cart: CartItem[];
  favorites: Product[];
  loadingFavorites: boolean;
  addToCart: (p: Product) => void;
  toggleFavorite: (p: Product) => void;
  isFavorite: (id: number) => boolean;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { auth } = useAuth();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingFavorites, setLoadingFavorites] = useState(false);


  useEffect(() => {
    api.get("/products?limit=100").then(res => {
      setProducts(res.data.data);
    });
  }, []);

 
  useEffect(() => {
    if (!auth.token) return;
    if (products.length === 0) return;

    let cancelled = false;

    const loadFavorites = async () => {
      try {
        setLoadingFavorites(true);

        const res = await getFavorites();
        if (cancelled) return;

        const favs = res.data as Favorite[];
        const mapped = favs
          .map(f => products.find(p => p.id === f.ProductID))
          .filter((p): p is Product => p !== undefined);

        setFavorites(mapped);
      } finally {
        if (!cancelled) setLoadingFavorites(false);
      }
    };

    loadFavorites();

    return () => {
      cancelled = true;
    };
  }, [auth.token, products]);

  const addToCart = (p: Product) => {
    setCart(prev => {
      const found = prev.find(i => i.id === p.id);
      if (found) {
        return prev.map(i =>
          i.id === p.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...p, qty: 1 }];
    });
  };

  const toggleFavorite = async (p: Product) => {
    await addFavorite(p.id);

    setFavorites(prev =>
      prev.some(f => f.id === p.id)
        ? prev.filter(f => f.id !== p.id)
        : [...prev, p]
    );
  };

  const isFavorite = (id: number) =>
    favorites.some(f => f.id === id);

  return (
    <CartContext.Provider
      value={{
        cart,
        favorites,
        loadingFavorites,
        addToCart,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
};
