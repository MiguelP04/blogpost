import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import UserNav from "../components/UserNav";
import UserProfile from "../components/UserProfile";
import UserPosts from "../components/UserPosts";
import UserAlbums from "../components/UserAlbums";
import { useUserData } from "../context/UserContext";

const BASE_API = import.meta.env.VITE_BASE_API;

export default function UserDashboard() {
  const { user } = useUserData();
  const navigate = useNavigate();

  const [selectedSection, setSelectedSection] = useState("profile");

  const [posts, setPosts] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (selectedSection === "profile") {
      // nothing to fetch here, UserProfile receives user from context
    }
  }, [user, selectedSection, navigate]);

  useEffect(() => {
    if (!user) return;
    if (selectedSection === "posts") {
      setPosts([]);
      fetch(`${BASE_API}/posts?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => setPosts(data))
        .catch(console.error);
    }
  }, [user, selectedSection]);

  useEffect(() => {
    if (!user) return;
    if (selectedSection === "albums") {
      setAlbums([]);
      setSelectedAlbumId(null);
      fetch(`${BASE_API}/albums?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => setAlbums(data))
        .catch(console.error);
    }
  }, [user, selectedSection]);

  useEffect(() => {
    if (selectedAlbumId === null) {
      setPhotos([]);
      return;
    }
    fetch(`${BASE_API}/photos?albumId=${selectedAlbumId}`)
      .then((res) => res.json())
      .then((data) => setPhotos(data))
      .catch(console.error);
  }, [selectedAlbumId]);

  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        <UserNav
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />
        <main className="flex-1 p-8 overflow-auto">
          {selectedSection === "profile" && <UserProfile user={user} />}
          {selectedSection === "posts" && (
            <UserPosts posts={posts} setPosts={setPosts} userId={user?.id} />
          )}
          {selectedSection === "albums" && (
            <UserAlbums
              albums={albums}
              selectedAlbumId={selectedAlbumId}
              setSelectedAlbumId={setSelectedAlbumId}
              photos={photos}
            />
          )}
        </main>
      </div>
    </>
  );
}
