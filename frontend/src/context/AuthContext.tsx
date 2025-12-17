import { createContext, useContext, useState } from "react";

type AuthState = {
  token: string | null;
  name: string | null;
  role: string | null;
};

type AuthContextType = {
  auth: AuthState;
  login: (data: AuthState) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({
    token: localStorage.getItem("token"),
    name: localStorage.getItem("name"),
    role: localStorage.getItem("role"),
  });

  const login = (data: AuthState) => {
    localStorage.setItem("token", data.token ?? "");
    localStorage.setItem("name", data.name ?? "");
    localStorage.setItem("role", data.role ?? "");
    setAuth(data);
  };

  const logout = () => {
    localStorage.clear();
    setAuth({ token: null, name: null, role: null }); 
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
