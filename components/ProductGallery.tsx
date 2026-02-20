"use client";

import React, { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  // Estado para saber qué imagen está seleccionada (por defecto la primera)
  const [mainImage, setMainImage] = useState(images[0]);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* IMAGEN PRINCIPAL GRANDE */}
      <div className="w-full aspect-[3/4] md:aspect-square bg-[#111] rounded-xl overflow-hidden border border-gray-800 relative">
        <img 
          src={mainImage} 
          alt="Vista del producto" 
          className="w-full h-full object-cover animate-in fade-in duration-500"
        />
      </div>

      {/* MINIATURAS (Solo se muestran si hay más de 1 foto) */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setMainImage(img)}
              className={`flex-shrink-0 w-20 h-24 md:w-24 md:h-28 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                mainImage === img 
                  ? 'border-[#00f2ff] opacity-100' 
                  : 'border-transparent opacity-60 hover:opacity-100 hover:border-gray-500'
              }`}
            >
              <img 
                src={img} 
                alt={`Miniatura ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}