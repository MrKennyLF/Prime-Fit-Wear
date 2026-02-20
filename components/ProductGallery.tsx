"use client";

import React, { useState, useRef } from 'react';

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);
  
  // Referencia para controlar el contenedor de miniaturas
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!images || images.length === 0) return null;

  // Condición: ¿Hay más de 7 imágenes?
  const showArrows = images.length > 5;

  // Función para mover el carrusel a la izquierda o derecha
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 250; // Qué tanto se mueve por clic
      scrollRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

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
        <div className="relative flex items-center group w-full">
          
          {/* BOTÓN IZQUIERDO (Solo si hay más de 7) */}
          {showArrows && (
            <button 
              onClick={() => scroll('left')}
              className="absolute left-0 z-10 bg-[#050505] border border-gray-700 text-gray-400 hover:text-[#00f2ff] hover:border-[#00f2ff] hover:shadow-[0_0_10px_rgba(0,242,255,0.3)] w-8 h-12 flex items-center justify-center transition-all opacity-80 hover:opacity-100"
              aria-label="Anterior"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          )}

          {/* CONTENEDOR DE MINIATURAS SCROLLABLE */}
          <div 
            ref={scrollRef}
            className={`flex gap-3 overflow-x-auto pb-2 scroll-smooth [&::-webkit-scrollbar]:hidden w-full ${showArrows ? 'px-10' : ''}`}
          >
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setMainImage(img)}
                className={`flex-shrink-0 w-20 h-24 md:w-24 md:h-28 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  mainImage === img 
                    ? 'border-[#00f2ff] opacity-100 shadow-[0_0_10px_rgba(0,242,255,0.2)]' 
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

          {/* BOTÓN DERECHO (Solo si hay más de 7) */}
          {showArrows && (
            <button 
              onClick={() => scroll('right')}
              className="absolute right-0 z-10 bg-[#050505] border border-gray-700 text-gray-400 hover:text-[#00f2ff] hover:border-[#00f2ff] hover:shadow-[0_0_10px_rgba(0,242,255,0.3)] w-8 h-12 flex items-center justify-center transition-all opacity-80 hover:opacity-100"
              aria-label="Siguiente"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          )}

        </div>
      )}
    </div>
  );
}