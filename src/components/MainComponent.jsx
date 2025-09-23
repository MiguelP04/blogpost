import Header from "./Header";
import { Outlet } from "react-router";

export default function MainComponent() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
