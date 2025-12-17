import { useEffect, useState } from "react";
import api from "../api/axios";
import type { Product } from "../types/product";
import type { ProductListResponse } from "../types/api";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import Pagination from "../components/Pagination";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadProducts = async () => {
      try {
        setLoading(true);

        const res = await api.get<ProductListResponse>(
          `/products?page=${page}&limit=8`
        );

        if (cancelled) return;
        setProducts(res.data.data);
        setTotalPages(res.data.meta.total_pages);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, [page]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {loading &&
          Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}

        {!loading &&
          products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
      </div>

      {!loading && (
        <div className="mt-10">
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={setPage}
          />
        </div>
      )}
    </div>
  );
}
