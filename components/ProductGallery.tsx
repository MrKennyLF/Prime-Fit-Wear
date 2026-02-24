"use client";

import React, { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  videoUrl?: string; // <--- Ahora acepta el video
}

export default function ProductGallery({ images, videoUrl }: ProductGalleryProps) {
  // 1. Unimos el video (si existe) y las imágenes en una sola lista
  const mediaList = [];
  
  if (videoUrl) {
    mediaList.push({ type: 'video', url: videoUrl });
  }
  
  images.forEach((img) => {
    mediaList.push({ type: 'image', url: img });
  });

  // 2. Controlamos qué miniatura está seleccionada (por defecto la 0, que será el video si hay)
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (mediaList.length === 0) {
    return <div className="w-full aspect-[4/5] bg-gray-900 rounded-lg flex items-center justify-center border border-gray-800">Sin imágenes</div>;
  }

  const currentMedia = mediaList[selectedIndex];

  return (
    <div className="flex flex-col gap-4">
      {/* VISOR PRINCIPAL GRANDE */}
      <div className="w-full aspect-[4/5] bg-black rounded-lg overflow-hidden border border-gray-800 shadow-[0_0_15px_rgba(0,242,255,0.1)] relative flex items-center justify-center">
        {currentMedia.type === 'video' ? (
          <video
            src={currentMedia.url}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-contain pointer-events-none"
          />
        ) : (
          <img
            src={currentMedia.url}
            alt="Detalle del producto"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* MINIATURAS (CARRUSEL INFERIOR) */}
      {mediaList.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#00f2ff] scrollbar-track-gray-900">
          {mediaList.map((media, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative w-20 h-24 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                selectedIndex === index 
                  ? 'border-[#00f2ff] opacity-100 shadow-[0_0_10px_rgba(0,242,255,0.5)]' 
                  : 'border-transparent opacity-50 hover:opacity-100'
              }`}
            >
              {media.type === 'video' ? (
                <>
                  <video src={media.url} className="w-full h-full object-cover" muted playsInline />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    {/* Ícono de Play para diferenciarlo de las fotos */}
                    <svg className="w-8 h-8 text-white opacity-90" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </>
              ) : (
                <img src={media.url} alt={`Miniatura ${index}`} className="w-full h-full object-cover" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}