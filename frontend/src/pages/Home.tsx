import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { Spinner } from "@/components/ui/spinner";

export default function Home() {
  const { favorites, loadingFavorites } = useCart();

  return (
    <div className="w-full py-4">
      {/* HERO */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col-reverse md:flex-row items-center gap-10">
          <div className="w-full md:w-1/2 text-black">
            <h1 className="text-4xl md:text-5xl font-bold">
              Welcome to <span className="text-blue-800">IRTS Store</span>
            </h1>

            <p className="mt-4 text-lg text-gray-500">
              Find the best products with the best price.
            </p>
          </div>

          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="./image.png"
              alt="hero banner"
              className="w-full max-w-md mix-blend-multiply drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-20">
        <h2 className="text-2xl font-bold mb-6">❤️ Favorite Products</h2>

        {loadingFavorites && (
          <div className="flex justify-center w- full">
            <Spinner />
          </div>
        )}

        {!loadingFavorites && favorites.length === 0 && (
          <p className="text-gray-500">
            You don’t have any favorite products yet.
          </p>
        )}

        {!loadingFavorites && favorites.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {favorites.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
