import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import MainComponent from "./components/MainComponent";
import { ProtectedRoutes } from "./components/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route element={<MainComponent />}>
            <Route path="/" element={<Home />} />
            {/* <Route path="/post/:postId" /> */}
            <Route path="/profile/:userId" element={<Profile />} />
            {/* <Route path="/Album/:albumId" /> */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
