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
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {!error ? (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover ${loading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
          {...rest}
        />
      ) : (
        <img
          src={fallbackSrc || "https://http.cat/status/102"}
          alt={alt}
          className="w-full h-full object-cover"
          {...rest}
        />
      )}
    </div>
  );
}
