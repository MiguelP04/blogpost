import ImageWithLoader from "./ImageWithLoader";

export default function PhotoModal({ photo, onClose }) {
  if (!photo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative max-w-3xl w-full rounded-2xl overflow-hidden bg-white shadow-2xl">
        <div className="flex justify-end p-2">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 px-3 py-1"
          >
            Cerrar
          </button>
        </div>

        <div className="p-4">
          <div className="w-full h-72 sm:h-96 rounded-lg overflow-hidden">
            <ImageWithLoader
              src={`https://picsum.photos/900/600?random=${photo.id}`}
              alt={photo.title}
              className="w-full h-full object-contain bg-black"
            />
          </div>

          <div className="mt-3">
            <h3 className="text-lg font-semibold">{photo.title}</h3>
            {photo.url && (
              <a
                className="text-sm text-indigo-600"
                href={photo.url}
                target="_blank"
                rel="noreferrer"
              >
                Abrir en nueva pestaña
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
