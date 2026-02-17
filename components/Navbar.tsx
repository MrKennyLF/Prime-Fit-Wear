"use client";

import React, { useState, useContext } from 'react'; // <--- Importamos useContext
import Link from 'next/link';
import { CartContext } from '../context/CartContext'; // <--- Importamos el Contexto real

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // 1. PEDIMOS EL CARRITO
  const context = useContext(CartContext);

  // 2. VALIDACIÓN DE SEGURIDAD (Esto arregla el error rojo)
  if (!context) {
    throw new Error("Navbar debe usarse dentro de un CartProvider");
  }

  // 3. AHORA SÍ SACAMOS LAS VARIABLES (Ya es seguro)
  // Nota: Asegúrate de que tu CartContext provea 'total'. Si no, bórralo de aquí.
  const { cart, total, removeFromCart } = context; 

  // Calculamos la cantidad de productos (por si cartCount no existe)
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO */}
          <Link href="/" className="text-2xl font-oswald font-bold text-white italic tracking-wider">
            PRIME<span className="text-[#00f2ff]">FIT</span>
          </Link>

          {/* CARRITO */}
          <button 
            onClick={() => context.setIsOpen(true)} // Usamos setIsOpen del contexto
            className="relative p-2 text-white hover:text-[#00f2ff] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            
            {/* Contador rojo */}
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#00f2ff] text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

        </div>
      </div>
    </nav>
  );
}