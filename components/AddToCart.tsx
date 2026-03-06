"use client";

import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function AddToCart({ product }: { product: any }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("AddToCart debe usarse dentro de un CartProvider");
  }

  const { addToCart, setIsOpen, cartItems = [] } = cartContext as any; 

  // Extraer el inventario por tallas desde Sanity
  const sizeStock = product.sizeStock || [];

  // Función para saber cuánto stock hay de una talla específica
  const getStockForSize = (talla: string) => {
    // Si Carlos aún no llena el stock nuevo, asumimos que hay (red de seguridad)
    if (sizeStock.length === 0) return 10; 
    const found = sizeStock.find((item: any) => item.size === talla);
    return found ? found.stock : 0;
  };

  // Validaciones del estado general
  const isTotallyOutOfStock = sizeStock.length > 0 && sizeStock.every((item: any) => item.stock <= 0);
  const currentStock = selectedSize ? getStockForSize(selectedSize) : 0;
  const isSelectedSizeOutOfStock = selectedSize && currentStock <= 0;

  // Tallas a mostrar (las que vienen de Sanity, o las clásicas por defecto)
  const displaySizes = sizeStock.length > 0 
    ? sizeStock.map((item: any) => item.size) 
    : ['S', 'M', 'L', 'XL'];

  const handleAddToCart = () => {
    if (isTotallyOutOfStock) return;

    if (!selectedSize) {
      alert("⚠️ Por favor, selecciona una talla primero.");
      return;
    }

    if (isSelectedSizeOutOfStock) return;

    const itemInCart = cartItems.find((item: any) => item._id === product._id && item.size === selectedSize);
    const currentCartQuantity = itemInCart ? itemInCart.quantity : 0;

    if (currentCartQuantity >= currentStock) {
      alert(`⚠️ Carlos solo tiene ${currentStock} pieza(s) en talla ${selectedSize} y ya las tienes en tu carrito.`);
      return;
    }
    
    addToCart(product, selectedSize);
    setIsOpen(true);
  };

  return (
    <div>
      {/* Selector de Tallas */}
      <div className="mb-10">
        <h3 className="text-white font-oswald uppercase tracking-widest text-sm mb-4">
          Selecciona tu talla {selectedSize && <span className="text-[#00f2ff]">({selectedSize})</span>}
        </h3>
        <div className="flex flex-wrap gap-3">
          {displaySizes.map((talla: string) => {
            const stockOfThisSize = getStockForSize(talla);
            const isThisSizeEmpty = stockOfThisSize <= 0;

            return (
              <button
                key={talla}
                onClick={() => !isThisSizeEmpty && setSelectedSize(talla)}
                disabled={isThisSizeEmpty}
                className={`w-12 h-12 rounded border flex items-center justify-center font-sans transition-all duration-300 ${
                  isThisSizeEmpty
                    ? 'border-red-900 text-red-700 bg-red-950/20 cursor-not-allowed opacity-50 relative overflow-hidden'
                    : selectedSize === talla
                      ? 'border-[#00f2ff] bg-[#00f2ff]/20 text-[#00f2ff] shadow-[0_0_10px_rgba(0,242,255,0.3)]'
                      : 'border-gray-700 text-gray-300 hover:border-[#00f2ff] hover:text-[#00f2ff]'
                }`}
              >
                {/* Tachadura visual si no hay stock */}
                {isThisSizeEmpty && (
                  <div className="absolute w-full h-[1px] bg-red-700 rotate-45"></div>
                )}
                {talla}
              </button>
            );
          })}
        </div>
        
        {/* Mensajes dinámicos según la talla seleccionada */}
        {isTotallyOutOfStock ? (
          <p className="text-red-500 font-sans text-sm mt-3">Todas las tallas están agotadas.</p>
        ) : isSelectedSizeOutOfStock ? (
          <p className="text-red-500 font-sans text-sm mt-3 animate-pulse">Esta talla está agotada por el momento.</p>
        ) : (selectedSize && currentStock <= 3) ? (
          <p className="text-[#00f2ff] font-sans text-sm mt-3 flex items-center gap-1 animate-pulse">
            ⚡ ¡Últimas {currentStock} piezas en talla {selectedSize}!
          </p>
        ) : null}
      </div>

      {/* BOTÓN PRINCIPAL */}
      <button 
        onClick={handleAddToCart}
        disabled={isTotallyOutOfStock || isSelectedSizeOutOfStock}
        className={`w-full border-2 font-oswald text-xl italic tracking-wider py-4 rounded transition-all duration-300 ${
          isTotallyOutOfStock || isSelectedSizeOutOfStock
            ? 'bg-gray-900 border-gray-800 text-gray-600 cursor-not-allowed'
            : 'bg-transparent border-[#00f2ff] text-[#00f2ff] hover:bg-[#00f2ff] hover:text-black hover:shadow-[0_0_20px_rgba(0,242,255,0.4)]'
        }`}
      >
        {isTotallyOutOfStock 
          ? 'TOTALMENTE AGOTADO' 
          : isSelectedSizeOutOfStock 
            ? 'TALLA AGOTADA' 
            : 'AGREGAR AL CARRITO'}
      </button>
    </div>
  );
}