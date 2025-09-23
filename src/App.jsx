import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";

import Profile from "./pages/Profile";
import { ProtectedRoutes } from "./components/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoutes />}>
          {/* <Route path="/post/:postId" /> */}
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/Album/:albumId" /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
