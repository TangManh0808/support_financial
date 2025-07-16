import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = ({ children, role, requireCompanyId = false }) => {
  const { user, isLoadingUser } = useAuth();

  const reactLocation = useLocation();

  if (isLoadingUser) return null; // hoặc spinner
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  console.log(user.role);
  console.log(role);
  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }
  if (requireCompanyId && user.role === "owner" && !user.company_id) {
    return <Navigate to="/setupcompanyFirst" state={{ from: reactLocation }} />;
  }
  // if (user.company_id) {
  //   return <Navigate to="/dashboard" />;
  // }
  return children;
};

export default PrivateRoute;
