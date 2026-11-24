import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("shopdesk_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    if (email === "admin@shop.com" && password === "admin123") {
      const userData = { name: "Admin", email };
      setUser(userData);
      localStorage.setItem("shopdesk_user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("shopdesk_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
