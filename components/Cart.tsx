"use client";

import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function Cart() {
  // 1. Obtenemos los datos del carrito
  const context = useContext(CartContext);

  // Si no hay contexto (por seguridad), no renderizamos nada
  if (!context) return null;

  const { cart, isOpen, setIsOpen, removeFromCart, total } = context;

  // --- LÓGICA DE WHATSAPP ---
  const handleCheckout = () => {
    // AQUÍ PONES EL NÚMERO DE CARLOS (formato internacional sin +)
    // Ejemplo México: 521 + 10 dígitos -> 5218112345678
    const phoneNumber = "528442735482"; 

    let message = "Hola PRIME FIT, quiero pedir lo siguiente:\n\n";

    // Recorremos los productos para armar la lista
    cart.forEach((item) => {
      message += `▪ ${item.name} (Talla: ${item.size}) x${item.quantity} - $${item.price}\n`;
    });

    message += `\n💰 TOTAL: $${total.toLocaleString('es-MX')} MXN`;
    message += `\n\nQuedo pendiente para el pago y envío.`;

    // Abrimos WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <>
      {/* FONDO OSCURO (OVERLAY) 
        Si isOpen es true, mostramos el fondo negro semitransparente.
        Si le das clic al fondo, se cierra el carrito.
      */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* PANEL LATERAL (DRAWER)
        Se desliza desde la derecha (translate-x).
      */}
      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#111] border-l border-gray-800 z-[70] transform transition-transform duration-300 shadow-2xl flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        
        {/* CABECERA DEL CARRITO */}
        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-black/50">
          <h2 className="text-2xl font-oswald font-bold text-white italic">
            TU <span className="text-[#00f2ff]">CARRITO</span>
          </h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white hover:rotate-90 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* LISTA DE PRODUCTOS (SCROLLABLE) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
              <p className="font-oswald text-xl uppercase tracking-widest">El carrito está vacío</p>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-[#00f2ff] underline text-sm hover:text-white transition-colors"
              >
                Volver al catálogo
              </button>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={`${item.id}-${item.size}-${index}`} className="flex gap-4 items-start animate-in slide-in-from-right-4 duration-500">
                
                {/* Imagen Miniatura */}
                <div className="w-20 h-24 bg-gray-800 rounded overflow-hidden flex-shrink-0 border border-gray-700">
                  <img 
                    src={item.images[0]} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info del Producto */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-oswald font-bold text-white uppercase tracking-wide text-lg leading-tight">
                      {item.name}
                    </h3>
                    {/* Botón Eliminar (X) */}
                    <button 
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                      </svg>
                    </button>
                  </div>
                  
                  <p className="text-gray-400 text-sm mt-1">Talla: <span className="text-white font-bold">{item.size}</span></p>
                  <p className="text-[#00f2ff] font-bold font-oswald mt-1">
                    ${item.price.toLocaleString('es-MX')}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* PIE DEL CARRITO (TOTAL Y BOTÓN) */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-800 bg-[#0a0a0a]">
            <div className="flex justify-between items-end mb-6">
              <span className="text-gray-400 font-sans uppercase tracking-widest text-sm">Total a Pagar</span>
              <span className="text-3xl font-oswald font-bold text-white">
                ${total.toLocaleString('es-MX')} <span className="text-sm text-gray-500 font-sans font-normal">MXN</span>
              </span>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-oswald font-bold text-xl py-4 rounded transition-all uppercase tracking-widest shadow-[0_0_20px_rgba(37,211,102,0.3)] flex items-center justify-center gap-3"
            >
              {/* Icono WhatsApp */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592z"/>
              </svg>
              Completar Pedido
            </button>
            <p className="text-center text-gray-600 text-[10px] mt-3 uppercase tracking-wider">
              Serás redirigido a WhatsApp para coordinar pago y envío
            </p>
          </div>
        )}

      </div>
    </>
  );
}