import React, { useState } from "react";

export default function ImageWithLoader({ src, alt = "", className = "", style = {}, fallbackSrc = null, ...rest }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => setLoading(false);
  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <div className={`relative overflow-hidden bg-gray-50 ${className}`} style={style}>
      {/* skeleton */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full animate-pulse bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100" />
        </div>
      )}

      {!error ? (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover ${loading ? "opacity-0 scale-105" : "opacity-100 scale-100"} transition-all duration-400 ease-out`}
          {...rest}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
          <img
            src={fallbackSrc || "https://via.placeholder.com/300x200?text=No+image"}
            alt={alt}
            className="w-full h-full object-cover"
            {...rest}
          />
        </div>
      )}
    </div>
  );
}
