import React, { useEffect, useState } from "react";
import ImageWithLoader from "./ImageWithLoader";

export default function PostComments({ postId, onClose }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [postId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-lg overflow-auto max-h-[80vh]">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Comentarios del post #{postId}</h3>
          <button onClick={onClose} className="text-sm text-gray-600 hover:text-gray-900">Cerrar</button>
        </div>

        <div className="p-4 space-y-4">
          {loading ? (
            <p>Cargando comentarios...</p>
          ) : comments.length === 0 ? (
            <p>No hay comentarios.</p>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-semibold">{c.name[0]}</div>
                  <div>
                    <div className="text-sm font-medium">{c.name}</div>
                    <div className="text-xs text-gray-500">{c.email}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-700">{c.body}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
