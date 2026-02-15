"use client";

import React, { useState } from 'react';
import Link from 'next/link'; // <--- Importamos esto

interface ProductProps {
  product: {
    id: number;
    name: string;
    price: string;
    description: string;
    images: string[];
  };
}

export default function ProductCard({ product }: ProductProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    // Envolvemos todo en Link para que sea clickeable
    <Link href={`/products/${product.id}`}>
      <div 
        className="group relative bg-[#0a0a0a] border border-gray-800 rounded-lg overflow-hidden hover:border-[#00f2ff] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(0,242,255,0.3)]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-900">
          <img
            src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 bg-[#00f2ff] text-black text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
            New Drop
          </div>
        </div>

        <div className="p-4 space-y-2">
          <h3 className="text-lg font-bold text-white tracking-wide uppercase group-hover:text-[#00f2ff] transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-2">
            {product.description}
          </p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-xl font-bold text-white">{product.price}</span>
            <button className="text-xs text-[#00f2ff] border border-[#00f2ff] px-3 py-1 rounded hover:bg-[#00f2ff] hover:text-black transition-colors uppercase">
              Ver +
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}