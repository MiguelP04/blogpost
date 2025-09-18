import React, { useEffect, useState } from "react";
const BASE_API = import.meta.env.VITE_BASE_API
const PICSUM_BASE = "https://picsum.photos/200/300?random=";

export default function UserDashboard() {
  const [userId, setUserId] = useState(1);
  const [selectedSection, setSelectedSection] = useState("profile");

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [photos, setPhotos] = useState([]);

  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");
  const [posting, setPosting] = useState(false);

  const [editingPostId, setEditingPostId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  useEffect(() => {
    if (selectedSection === "profile") {
      setUser(null);
      fetch(`${BASE_API}/users/${userId}`)
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch(console.error);
    }
  }, [userId, selectedSection]);

  useEffect(() => {
    if (selectedSection === "posts") {
      setPosts([]);
      fetch(`${BASE_API}/posts?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => setPosts(data))
        .catch(console.error);
    }
  }, [userId, selectedSection]);

  useEffect(() => {
    if (selectedSection === "albums") {
      setAlbums([]);
      setSelectedAlbumId(null);
      fetch(`${BASE_API}/albums?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => setAlbums(data))
        .catch(console.error);
    }
  }, [userId, selectedSection]);

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

  const handleAddPost = () => {
    if (newPostTitle.trim() === "" || newPostBody.trim() === "") {
      alert("Por favor, completa título y cuerpo.");
      return;
    }
    setPosting(true);
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newPostTitle,
        body: newPostBody,
        userId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts((prev) => [data, ...prev]);
        setNewPostTitle("");
        setNewPostBody("");
        setPosting(false);
      })
      .catch((error) => {
        console.error("Error agregando post:", error);
        setPosting(false);
      });
  };

  const startEdit = (post) => {
    setEditingPostId(post.id);
    setEditTitle(post.title);
    setEditBody(post.body);
  };

  const cancelEdit = () => {
    setEditingPostId(null);
    setEditTitle("");
    setEditBody("");
  };

  const saveEdit = () => {
    setPosts(posts.map(post => post.id === editingPostId ? { ...post, title: editTitle, body: editBody } : post));
    cancelEdit();
  };

  const deletePost = (postId) => {
    if (window.confirm("¿Seguro que quieres eliminar este post?")) {
      setPosts(posts.filter(post => post.id !== postId));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <nav className="w-48 bg-white shadow flex flex-col">
        <div className="p-4 border-b">
          <label htmlFor="userId" className="block mb-2 font-semibold">
            ID Usuario:
          </label>
          <input
            id="userId"
            type="number"
            min="1"
            max="10"
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
            className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <button
          onClick={() => setSelectedSection("profile")}
          className={`p-4 text-left hover:bg-indigo-100 transition ${selectedSection === "profile" ? "bg-indigo-200 font-bold" : ""}`}
        >
          Perfil
        </button>
        <button
          onClick={() => setSelectedSection("posts")}
          className={`p-4 text-left hover:bg-indigo-100 transition ${selectedSection === "posts" ? "bg-indigo-200 font-bold" : ""}`}
        >
          Posts
        </button>
        <button
          onClick={() => setSelectedSection("albums")}
          className={`p-4 text-left hover:bg-indigo-100 transition ${selectedSection === "albums" ? "bg-indigo-200 font-bold" : ""}`}
        >
          Álbumes
        </button>
      </nav>

      <main className="flex-1 p-8 overflow-auto">
        {selectedSection === "profile" && (
          <>
            {!user ? (
              <p>Cargando perfil...</p>
            ) : (
              <div className="max-w-lg bg-white p-6 rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-4 text-indigo-700">Mi Perfil</h1>
                <p><strong>Nombre:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Teléfono:</strong> {user.phone}</p>
                <p><strong>Sitio Web:</strong>{user.website}</p>
                <p><strong>Compañía:</strong> {user.company.name}</p>
                <p><strong>Dirección:</strong> {user.address.street}, {user.address.city}</p>
              </div>
            )}
          </>
        )}

        {selectedSection === "posts" && (
          <>
            <h1 className="text-2xl font-bold mb-6 text-indigo-700">Mis Publicaciones</h1>

            <div className="mb-8 max-w-xl bg-white p-6 rounded shadow">
              <h2 className="font-semibold mb-3">Que estas pensando?</h2>
              <input
                type="text"
                placeholder="Título"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <textarea
                placeholder="Contenido"
                value={newPostBody}
                onChange={(e) => setNewPostBody(e.target.value)}
                className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                rows={4}
              />
              <button
                onClick={handleAddPost}
                disabled={posting}
                className={`px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition ${posting ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {posting ? "Publicando..." : "Agregar Post"}
              </button>
            </div>

            {posts.length === 0 ? (
              <p>Cargando posts...</p>
            ) : (
              <ul className="space-y-4 max-w-xl">
                {posts.map((post) => (
                  <li key={post.id} className="bg-white p-4 rounded shadow hover:shadow-md transition">
                    {editingPostId === post.id ? (
                      <>
                        <input
                          className="w-full mb-2 px-3 py-2 border rounded"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <textarea
                          className="w-full mb-2 px-3 py-2 border rounded"
                          rows={4}
                          value={editBody}
                          onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button
                          onClick={saveEdit}
                          className="mr-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <h2 className="font-semibold mb-1">{post.title}</h2>
                        <p>{post.body}</p>
                        <div className="mt-3 space-x-2">
                          <button
                            onClick={() => startEdit(post)}
                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => deletePost(post.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Borrar
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {selectedSection === "albums" && (
          <>
            <h1 className="text-2xl font-bold mb-4 text-indigo-700">Álbumes</h1>
            {albums.length === 0 ? (
              <p>No hay álbumes.</p>
            ) : (
              <ul className="max-w-xl space-y-2">
                {albums.map((album) => (
                  <li
                    key={album.id}
                    onClick={() => setSelectedAlbumId(album.id)}
                    className={`cursor-pointer p-3 rounded ${
                      selectedAlbumId === album.id ? "bg-indigo-200 font-semibold" : "hover:bg-indigo-100"
                    }`}
                  >
                    {album.title}
                  </li>
                ))}
              </ul>
            )}

            {selectedAlbumId && (
              <>
                <h2 className="text-xl font-semibold mt-6 mb-3">Fotos del álbum</h2>
                {photos.length === 0 ? (
                  <p>Cargando fotos...</p>
                ) : (
                  <div className="grid grid-cols-4 gap-3 max-w-xl">
                    {photos.slice(0, 12).map((photo) => (
                      <img
                        key={photo.id}
                        src={`${PICSUM_BASE}${photo.id}`}
                        alt={photo.title}
                        title={photo.title}
                        className="rounded border border-gray-300 cursor-pointer hover:scale-105 transition-transform"
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
