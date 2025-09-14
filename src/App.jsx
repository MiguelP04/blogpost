import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Album from "./pages/Album";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/Album/:albumId" element={<Album />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
