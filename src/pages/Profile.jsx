import React, { useEffect, useState } from "react";

export default function Profile() {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    setUser(null);
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error fetching user:", error));
  }, [userId]);

  useEffect(() => {
    setAlbums([]);
    setSelectedAlbumId(null); 
    fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => setAlbums(data))
      .catch((error) => console.error("Error fetching albums:", error));
  }, [userId]);

  useEffect(() => {
    if (selectedAlbumId === null) {
      setPhotos([]);
      return;
    }
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${selectedAlbumId}`)
      .then((res) => res.json())
      .then((data) => setPhotos(data))
      .catch((error) => console.error("Error fetching photos:", error));
  }, [selectedAlbumId]);

  if (!user) return <p className="text-center p-4">Cargando usuario...</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4">Perfil de Usuario</h1>
      <div className="mb-4">{/* esto se elimina al tener el userid con el login */}
        <label htmlFor="userId" className="mr-2">ID de usuario:</label>
        <input
          id="userId"
          type="number"
          min="1"
          max="10"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
          className="border rounded px-2 py-1 w-16"
        />
      </div>
      <p className="mb-2"><strong>Nombre:</strong> {user.name}</p>
      <p className="mb-2"><strong>Correo:</strong> {user.email}</p>
      <p className="mb-2"><strong>Teléfono:</strong> {user.phone}</p>
      <p className="mb-2"><strong>Website:</strong> {user.website}</p>
      <p className="mb-2"><strong>Compañía:</strong> {user.company.name}</p>
      <p className="mb-2"><strong>Dirección:</strong> {user.address.street}, {user.address.city}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Álbumes del usuario</h2>
      <ul className="list-disc pl-5">
        {albums.map((album) => (
          <li 
            key={album.id} 
            className="cursor-pointer text-blue-600 hover:underline"
            onClick={() => setSelectedAlbumId(album.id)}
          >
            {album.title}
          </li>
        ))}
      </ul>

      {selectedAlbumId && (
        <>
          <h3 className="text-lg font-semibold mt-6 mb-2">Fotos del álbum</h3>
          {photos.length === 0 ? (
            <p className="text-gray-500">Cargando fotos...</p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {photos.slice(0, 12).map((photo) => (
                <img 
                  key={photo.id} 
                  src={photo.thumbnailUrl} 
                  alt={photo.title} 
                  className="rounded border"
                  title={photo.title}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
