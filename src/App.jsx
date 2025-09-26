import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import MainComponent from "./components/MainComponent";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";
import PostDetails from "./pages/PostDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route element={<MainComponent />}>
            <Route path="/" element={<Home />} />
            <Route path="/post-details" element={<PostDetails />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
