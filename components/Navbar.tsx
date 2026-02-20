"use client";

import React, { useContext } from 'react';
import Link from 'next/link';
import { CartContext } from '../context/CartContext';

export default function Navbar() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("Navbar debe usarse dentro de un CartProvider");
  }

  const { cartCount, setIsOpen } = context;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-gray-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO OFICIAL (Ahora más grande y redondo) */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img 
              src="/logo.jpeg" 
              alt="Prime Fit Wear" 
              // w-14 y h-14 lo hacen más grande. rounded-full lo hace circular.
              className="w-14 h-14 rounded-full object-cover border border-gray-800 hover:border-[#00f2ff] shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-all" 
            />
          </Link>

          {/* BOTÓN DEL CARRITO */}
          <button 
            onClick={() => setIsOpen(true)}
            className="relative p-2 text-white hover:text-[#00f2ff] transition-colors group"
            aria-label="Abrir carrito"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#00f2ff] text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(0,242,255,0.6)] animate-in zoom-in duration-300">
                {cartCount}
              </span>
            )}
          </button>

        </div>
      </div>
    </nav>
  );
}