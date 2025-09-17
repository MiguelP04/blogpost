import React from "react";
import { useUserData } from "../hooks/useUserData";

function Home() {
  const { user } = useUserData();
  console.log(user);
  return <div>Home</div>;
}

export default Home;
