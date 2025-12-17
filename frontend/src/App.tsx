import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <AuthProvider>
     <CartProvider>
    <div className="">
      <div className="">
        <AppRoutes />
      </div>
    </div>
    </CartProvider>
    </AuthProvider>
  );
}
