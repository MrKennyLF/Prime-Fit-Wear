"use client";

import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';

// Ahora aceptamos el producto completo sin desarmarlo
export default function AddToCart({ product }: { product: any }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("AddToCart debe usarse dentro de un CartProvider");
  }

  const { addToCart, setIsOpen } = cartContext;
  const tallas = ['S', 'M', 'L', 'XL'];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("⚠️ Por favor, selecciona una talla primero.");
      return;
    }
    
    // Le mandamos el producto original entero y la talla elegida
    addToCart(product, selectedSize);

    // Abrimos el carrito
    setIsOpen(true);
  };

  return (
    <div>
      {/* Selector de Tallas */}
      <div className="mb-10">
        <h3 className="text-white font-oswald uppercase tracking-widest text-sm mb-4">
          Selecciona tu talla {selectedSize && <span className="text-[#00f2ff]">({selectedSize})</span>}
        </h3>
        <div className="flex gap-3">
          {tallas.map((talla) => (
            <button
              key={talla}
              onClick={() => setSelectedSize(talla)}
              className={`w-12 h-12 rounded border flex items-center justify-center font-sans transition-all duration-300 ${
                selectedSize === talla
                  ? 'border-[#00f2ff] bg-[#00f2ff]/20 text-[#00f2ff] shadow-[0_0_10px_rgba(0,242,255,0.3)]'
                  : 'border-gray-700 text-gray-300 hover:border-[#00f2ff] hover:text-[#00f2ff]'
              }`}
            >
              {talla}
            </button>
          ))}
        </div>
      </div>

      {/* BOTÓN DE AGREGAR AL CARRITO */}
      <button 
        onClick={handleAddToCart}
        className="w-full bg-transparent border-2 border-[#00f2ff] text-[#00f2ff] font-oswald text-xl italic tracking-wider py-4 rounded hover:bg-[#00f2ff] hover:text-black hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all duration-300"
      >
        AGREGAR AL CARRITO
      </button>
    </div>
  );
}