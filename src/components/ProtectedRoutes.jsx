import { Navigate, Outlet } from "react-router";
import { useUserData } from "../hooks/useUserData";

export function ProtectedRoutes({ children }) {
  const { user } = useUserData();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
}
