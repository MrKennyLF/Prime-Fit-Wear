"use client";

import React, { useRef } from 'react';
import ProductCard from './ProductCard';

// Definimos qué forma tiene un producto (para que TypeScript no se queje)
interface Product {
  id: string; 
  name: string;
  slug: { current: string }; // <--- AGREGAR ESTO
  price: number;
  description: string;
  category: string;
  gender: string;
  images: string[];
  isNew: boolean;
}

interface LatestDropsProps {
  products: Product[];
}

export default function LatestDrops({ products }: LatestDropsProps) {
  // Filtramos solo los productos NUEVOS (isNew == true)
  const newProducts = products.filter((p) => p.isNew);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 300;
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  // Si no hay productos nuevos, no mostramos nada
  if (newProducts.length === 0) return null;

  return (
    <section className="py-20 border-b border-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Cabecera */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-oswald font-bold text-white italic uppercase">
              Latest <span className="text-[#00f2ff] drop-shadow-[0_0_10px_rgba(0,242,255,0.5)]">Drops</span>
            </h2>
            <p className="text-gray-400 font-sans text-sm tracking-widest mt-2 uppercase">
              La colección más reciente
            </p>
          </div>
          
          {/* Botones */}
          <div className="flex gap-2">
            <button 
              onClick={() => scroll('left')}
              className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center hover:bg-[#00f2ff] hover:text-black transition-all"
            >
              ←
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center hover:bg-[#00f2ff] hover:text-black transition-all"
            >
              →
            </button>
          </div>
        </div>

        {/* Carrusel */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {newProducts.map((product) => (
            <div key={product.id} className="min-w-[280px] md:min-w-[320px] snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}