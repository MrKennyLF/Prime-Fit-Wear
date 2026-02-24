"use client";

import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function AddToCart({ product }: { product: any }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("AddToCart debe usarse dentro de un CartProvider");
  }

  // Extraemos cartItems (o tu equivalente) del contexto para saber cuántos lleva ya el cliente
  const { addToCart, setIsOpen, cartItems = [] } = cartContext as any; 
  
  const tallas = ['S', 'M', 'L', 'XL'];

  // Validamos el stock (Si el campo no existe aún o está vacío, asumimos que sí hay para no romper la tienda)
  const stock = product.stock !== undefined ? product.stock : 10; 
  const isOutOfStock = stock <= 0;

  const handleAddToCart = () => {
    // 1. Evitar clics fantasma si está agotado
    if (isOutOfStock) return;

    // 2. Validar talla
    if (!selectedSize) {
      alert("⚠️ Por favor, selecciona una talla primero.");
      return;
    }

    // 3. Revisar si el cliente ya tiene el límite de stock en su carrito
    // (Busca si este producto exacto y talla exacta ya está en el carrito)
    const itemInCart = cartItems.find((item: any) => item._id === product._id && item.size === selectedSize);
    const currentQuantity = itemInCart ? itemInCart.quantity : 0;

    if (currentQuantity >= stock) {
      alert(`⚠️ Carlos solo tiene ${stock} pieza(s) en stock y ya las tienes apartadas en tu carrito.`);
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
              onClick={() => !isOutOfStock && setSelectedSize(talla)}
              disabled={isOutOfStock}
              className={`w-12 h-12 rounded border flex items-center justify-center font-sans transition-all duration-300 ${
                isOutOfStock
                  ? 'border-gray-800 text-gray-700 bg-gray-900 cursor-not-allowed'
                  : selectedSize === talla
                    ? 'border-[#00f2ff] bg-[#00f2ff]/20 text-[#00f2ff] shadow-[0_0_10px_rgba(0,242,255,0.3)]'
                    : 'border-gray-700 text-gray-300 hover:border-[#00f2ff] hover:text-[#00f2ff]'
              }`}
            >
              {talla}
            </button>
          ))}
        </div>
        
        {/* Mensaje de Agotado */}
        {isOutOfStock && (
          <p className="text-red-500 font-sans text-sm mt-3">Este producto está agotado por el momento.</p>
        )}
        
        {/* Mensaje de Escasez (FOMO) */}
        {!isOutOfStock && stock <= 3 && (
          <p className="text-[#00f2ff] font-sans text-sm mt-3 flex items-center gap-1 animate-pulse">
            ⚡ ¡Últimas {stock} piezas disponibles!
          </p>
        )}
      </div>

      {/* BOTÓN DE AGREGAR AL CARRITO */}
      <button 
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        className={`w-full border-2 font-oswald text-xl italic tracking-wider py-4 rounded transition-all duration-300 ${
          isOutOfStock
            ? 'bg-gray-900 border-gray-800 text-gray-600 cursor-not-allowed'
            : 'bg-transparent border-[#00f2ff] text-[#00f2ff] hover:bg-[#00f2ff] hover:text-black hover:shadow-[0_0_20px_rgba(0,242,255,0.4)]'
        }`}
      >
        {isOutOfStock ? 'AGOTADO' : 'AGREGAR AL CARRITO'}
      </button>
    </div>
  );
}