import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Album from "./pages/Album";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import { ProtectedRoutes } from "./components/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/post/:postId" element={<Post />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/Album/:albumId" element={<Album />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
