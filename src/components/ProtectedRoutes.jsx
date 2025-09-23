import { Navigate, Outlet } from "react-router";
import { useUserData } from "../context/UserContext";
import { useEffect } from "react";

export function ProtectedRoutes() {
  const { setUser } = useUserData();

  const userStorage = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setUser(userStorage);
  }, []);

  if (!userStorage) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
