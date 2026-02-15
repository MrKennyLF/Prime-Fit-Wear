"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { cart, cartCount, total, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  // LOGICA DE WHATSAPP
  const handleCheckout = () => {
    const phoneNumber = "528442735482"; // TU NUMERO AQUÍ
    let message = "Hola buenas tardes, quisiera realizar el siguiente pedido:\n\n";
    cart.forEach((item) => {
      message += `• ${item.name} (Talla: ${item.size}) x${item.quantity} - $${item.price * item.quantity}\n`;
    });
    message += `\nTotal Estimado: $${total}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* --- BARRA SUPERIOR (NAVBAR) --- */}
      <nav className="fixed top-0 left-0 w-full h-20 z-50 bg-[#050505] border-b border-gray-800 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo Imagen */}
          <Link href="/" className="flex items-center gap-2">
            <img 
  src="/logo.jpeg" 
  alt="Prime Fit Logo" 
  // Cambios: w-12 (ancho fijo), object-cover (rellenar), rounded-full (círculo)
  className="h-12 w-12 object-cover rounded-full border border-gray-800" 
/>
          </Link>
          {/* Botón del Carrito - Más visible */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative p-3 hover:bg-gray-800 rounded-full transition-colors group"
          >
            {/* Ícono de bolsa */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 text-white group-hover:text-[#00f2ff]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>

            {/* Contador rojo - Posicionado mejor */}
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#00f2ff] text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/50">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* --- SIDEBAR (PANEL LATERAL) --- */}

      {/* 1. Fondo oscuro al abrir */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-[60] backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 2. El Panel Mismo */}
      <div className={`fixed top-0 right-0 h-full w-[85vw] md:w-[450px] bg-[#0a0a0a] border-l border-[#00f2ff]/30 z-[70] transform transition-transform duration-300 shadow-2xl flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Cabecera */}
        <div className="flex justify-between items-center p-6 border-b border-gray-800 bg-[#050505]">
          <h2 className="text-2xl font-bold uppercase tracking-wider text-white">Tu Carrito</h2>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:text-[#00f2ff] text-gray-400">
            ✕
          </button>
        </div>

        {/* Lista de Productos */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center mt-20 opacity-50">
              <p>El carrito está vacío</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-4 bg-[#111] p-4 rounded border border-gray-800">
                <img src={item.image} className="w-20 h-24 object-cover rounded bg-gray-800" />
                <div className="flex-1">
                  <h4 className="font-bold text-white">{item.name}</h4>
                  <p className="text-sm text-gray-400">Talla: {item.size}</p>
                  <p className="text-[#00f2ff] font-mono mt-1">${item.price}</p>
                </div>
                <button onClick={() => removeFromCart(item.id, item.size)} className="text-gray-500 hover:text-red-500 self-start">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer con Total */}
        {cart.length > 0 && (
          <div className="p-6 bg-[#050505] border-t border-gray-800">
            <div className="flex justify-between text-2xl font-bold mb-6 text-white">
              <span>Total</span>
              <span className="text-[#00f2ff]">${total}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-4 bg-[#00f2ff] text-black font-bold uppercase tracking-widest hover:bg-[#00d0dd] transition-colors flex items-center justify-center gap-3 rounded"
            >
              <span>Completar Pedido</span>
              {/* ESTE ES EL ÍCONO ARREGLADO (Tamaño fijo 24px) */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 5L19 12L12 19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
}