import React from 'react';
import Link from 'next/link';

interface ProductProps {
  product: {
    id: string;
    name: string;
    slug: { current: string };
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
      
      {product.isNew && (
        <div className="absolute top-2 right-2 bg-[#00f2ff] text-black text-[10px] font-bold px-2 py-1 rounded font-oswald z-10 pointer-events-none">
          NEW DROP
        </div>
      )}

      <Link href={`/product/${product.slug.current}`} className="relative aspect-[3/4] overflow-hidden block cursor-pointer">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        
        <Link href={`/product/${product.slug.current}`}>
          <h3 className="text-white font-oswald text-xl uppercase italic mb-1 tracking-wide hover:text-[#00f2ff] transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-400 text-xs font-sans mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-800">
          <span className="text-[#00f2ff] font-bold font-oswald text-lg">
            ${product.price.toLocaleString('es-MX')}
          </span>
          
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