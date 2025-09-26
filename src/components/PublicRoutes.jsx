import { Navigate, Outlet } from "react-router";

export default function PublicRoutes() {
  const userStoraged = localStorage.getItem("user");

  if (userStoraged) return <Navigate to="/" replace />;

  return <Outlet />;
}
