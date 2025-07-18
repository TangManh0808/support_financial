import { createContext, useState, useEffect } from "react";

// Tạo context
export const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("user"); // ✅ role hiện tại (admin | user)
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    const savedAdmin = localStorage.getItem("adminUser");
    const savedUser = localStorage.getItem("user");

    if (savedAdmin && savedAdmin !== "undefined") {
      setUser(JSON.parse(savedAdmin));
      setRole("admin");
    } else if (savedUser && savedUser !== "undefined") {
      setUser(JSON.parse(savedUser));
      setRole("user");
    }

    setIsLoadingUser(false);
  }, []);

  const login = (userOrPayload, maybeToken) => {
    if (userOrPayload?.token && userOrPayload?.user) {
      const { token, user } = userOrPayload;

      if (user.role === "admin") {
        localStorage.setItem("adminToken", token);
        localStorage.setItem("adminUser", JSON.stringify(user));
        setRole("admin");
      } else {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setRole("user");
      }
      setUser(user);
    } else {
      // Trường hợp update thủ công sau đăng ký hoặc tạo công ty
      if (maybeToken) {
        localStorage.setItem("token", maybeToken);
      }
      localStorage.setItem("user", JSON.stringify(userOrPayload));
      setUser(userOrPayload);
      setRole("user");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    setUser(null);
    setRole("user");
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, isLoadingUser }}>
      {children}
    </AuthContext.Provider>
  );
};
