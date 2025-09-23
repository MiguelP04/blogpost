import { useState } from "react";
import ImageWithLoader from "./ImageWithLoader";
import PhotoModal from "./PhotoModal";

const PICSUM_BASE = "https://picsum.photos/600/400?random=";

export default function UserAlbums({
  albums,
  selectedAlbumId,
  setSelectedAlbumId,
  photos,
}) {
  const [modalPhoto, setModalPhoto] = useState(null);

  return (
    <div>
      {!selectedAlbumId && (
        <>
          <h1 className="text-2xl font-bold mb-6 text-indigo-700 text-center">
            Álbumes
          </h1>
          {albums.length === 0 ? (
            <p className="text-center">No hay álbumes.</p>
          ) : (
            <div className="w-full flex justify-center">
              <div className="w-full max-w-6xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {albums.map((album) => (
                    <div
                      key={album.id}
                      className={`cursor-pointer rounded-2xl overflow-hidden shadow-lg transform transition hover:-translate-y-1 hover:shadow-2xl border ${
                        selectedAlbumId === album.id
                          ? "ring-4 ring-indigo-100"
                          : "border-gray-100"
                      }`}
                      onClick={() => setSelectedAlbumId(album.id)}
                    >
                      <div className="relative h-44 bg-gray-50">
                        <ImageWithLoader
                          src={`${PICSUM_BASE}${album.id}`}
                          alt={album.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
                          <div className="p-4 text-white w-full">
                            <h2 className="font-semibold text-lg truncate">
                              {album.title}
                            </h2>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-white">
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {album.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {selectedAlbumId && (
        <div className="w-full flex justify-center mt-6">
          <div className="w-full max-w-6xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-indigo-700">
                Fotos del álbum
              </h2>
              <button
                className="px-3 py-1 bg-gray-100 rounded-lg text-sm hover:bg-gray-200"
                onClick={() => setSelectedAlbumId(null)}
              >
                Volver a álbumes
              </button>
            </div>

            {photos.length === 0 ? (
              <p className="text-center">Cargando fotos...</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {photos.slice(0, 12).map((photo) => (
                  <div
                    key={photo.id}
                    className="rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition relative bg-white"
                  >
                    <button
                      className="block w-full h-full"
                      onClick={() => setModalPhoto(photo)}
                      aria-label={`Ver ${photo.title}`}
                    >
                      <div className="relative h-48">
                        <ImageWithLoader
                          src={`${PICSUM_BASE}${photo.id}`}
                          alt={photo.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-end p-2 bg-gradient-to-t from-black/25 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                          <p className="text-xs text-white truncate">
                            {photo.title}
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {modalPhoto && (
        <PhotoModal photo={modalPhoto} onClose={() => setModalPhoto(null)} />
      )}
    </div>
  );
}
