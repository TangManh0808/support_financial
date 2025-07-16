import { createContext, useState, useEffect } from "react";

// Tạo context
export const AuthContext = createContext();

// Provider dùng bọc toàn bộ app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true); // 🆕

  // Khi App load, khôi phục user từ localStorage (nếu có)
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser && savedUser !== "undefined") {
      setUser(JSON.parse(savedUser));
    }
    setIsLoadingUser(false); // 🆕 Đánh dấu đã load xong
  }, []);

  /**
   * Hàm login:
   * - Nếu gọi từ API login: truyền vào { token, user }
   * - Nếu cập nhật user sau khi tạo công ty: chỉ truyền user (object)
   */
  const login = (userOrPayload, maybeToken) => {
    if (userOrPayload?.token && userOrPayload?.user) {
      // Trường hợp: login từ API
      localStorage.setItem("token", userOrPayload.token);
      localStorage.setItem("user", JSON.stringify(userOrPayload.user));
      setUser(userOrPayload.user);
    } else {
      // Trường hợp: cập nhật user sau khi tạo công ty
      if (maybeToken) {
        localStorage.setItem("token", maybeToken);
      }
      localStorage.setItem("user", JSON.stringify(userOrPayload));
      setUser(userOrPayload);
    }
  };

  // Hàm logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoadingUser }}>
      {children}
    </AuthContext.Provider>
  );
};
