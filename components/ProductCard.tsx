import React from 'react';
import Link from 'next/link';

interface ProductProps {
  product: {
    id: string;
    name: string;
    slug: { current: string }; // <--- Aceptamos el slug
    price: number;
    description: string;
    images: string[];
    category?: string;
    isNew?: boolean;
  };
}

export default function ProductCard({ product }: ProductProps) {
  return (
    <div className="group relative bg-[#111] border border-gray-800 rounded-lg overflow-hidden hover:border-[#00f2ff] transition-all duration-300 flex flex-col h-full">
      
      {/* Etiqueta NEW DROP */}
      {product.isNew && (
        <div className="absolute top-2 right-2 bg-[#00f2ff] text-black text-[10px] font-bold px-2 py-1 rounded font-oswald z-10">
          NEW DROP
        </div>
      )}

      {/* Imagen */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-white font-oswald text-xl uppercase italic mb-1 tracking-wide">
          {product.name}
        </h3>
        
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-800">
          <span className="text-[#00f2ff] font-bold font-oswald text-lg">
            ${product.price.toLocaleString('es-MX')}
          </span>
          
          {/* BOTÓN: Ahora es un enlace a la página de detalle */}
          <Link href={`/product/${product.slug.current}`}>
            <button className="bg-transparent border border-[#00f2ff] text-[#00f2ff] text-xs font-bold px-4 py-2 rounded hover:bg-[#00f2ff] hover:text-black transition-all uppercase tracking-wider">
              VER / AGREGAR
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}