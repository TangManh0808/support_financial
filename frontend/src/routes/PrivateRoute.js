import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  // Nếu chưa đăng nhập thì chuyển về login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Nếu đã đăng nhập thì cho phép truy cập
  return children;
};

export default PrivateRoute;
