import { useState } from "react";
import PostComments from "./PostComments";

export default function UserPosts({ posts, setPosts, userId }) {
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");
  const [posting, setPosting] = useState(false);

  const [editingPostId, setEditingPostId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

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

  const [activePostComments, setActivePostComments] = useState(null);

  return (
    <>
      <div className="flex items-center justify-between mb-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-indigo-700">Mis Publicaciones</h1>
      </div>

      <div className="mb-8 max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="font-semibold mb-3">¿Qué estás pensando?</h2>
        <input
          type="text"
          placeholder="Título"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
          className="w-full mb-3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <textarea
          placeholder="Contenido"
          value={newPostBody}
          onChange={(e) => setNewPostBody(e.target.value)}
          className="w-full mb-3 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          rows={4}
        />
        <div className="flex items-center gap-3">
          <button
            onClick={handleAddPost}
            disabled={posting}
            className={`px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition ${posting ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {posting ? "Publicando..." : "Agregar Post"}
          </button>
          <span className="text-sm text-gray-500">Publicaciones: {posts.length}</span>
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="text-center">Cargando posts...</p>
      ) : (
        <ul className="grid gap-4 max-w-3xl mx-auto">
          {posts.map((post) => (
            <li key={post.id} className="bg-white p-4 rounded-2xl shadow hover:shadow-md transition">
              {editingPostId === post.id ? (
                <>
                  <input
                    className="w-full mb-2 px-3 py-2 border rounded-lg"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <textarea
                    className="w-full mb-2 px-3 py-2 border rounded-lg"
                    rows={4}
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                  />
                  <div className="flex mt-2">
                    <button
                      onClick={saveEdit}
                      className="mr-2 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-3 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div onClick={() => setActivePostComments(post.id)} className="cursor-pointer">
                    <h2 className="font-semibold mb-1 text-lg">{post.title}</h2>
                    <p className="text-sm text-gray-700">{post.body}</p>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); startEdit(post); }}
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Editar
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); deletePost(post.id); }}
                      className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
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
      {activePostComments && (
        <PostComments postId={activePostComments} onClose={() => setActivePostComments(null)} />
      )}
    </>
  );
}
