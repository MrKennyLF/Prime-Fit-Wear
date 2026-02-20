"use client";

import React, { useRef } from 'react';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  slug: { current: string };
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
  const scrollRef = useRef<HTMLDivElement>(null);

  const newDrops = products.filter(p => p.isNew);

  if (newDrops.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-[#0a0a0a] border-y border-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-4xl font-oswald font-bold text-white uppercase italic tracking-wider">
              LATEST <span className="text-[#00f2ff]">DROPS</span>
            </h2>
            <p className="text-gray-400 font-sans text-sm tracking-widest uppercase mt-2">
              La colección más reciente
            </p>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => scroll('left')} 
              className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-white hover:border-[#00f2ff] hover:text-[#00f2ff] transition-all bg-black"
            >
              ←
            </button>
            <button 
              onClick={() => scroll('right')} 
              className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-white hover:border-[#00f2ff] hover:text-[#00f2ff] transition-all bg-black"
            >
              →
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {newDrops.map((product) => (
            <div 
              key={product.id} 
              className="snap-start flex-shrink-0 w-[80vw] sm:w-[300px] lg:w-[320px]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}