"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';

// 1. DEFINICIÓN DEL TIPO (El Contrato)
// Aquí decimos qué cosas va a tener nuestro contexto
export interface CartContextType {
  cart: any[];
  addToCart: (product: any, size: string) => void;
  removeFromCart: (id: string, size: string) => void;
  total: number;
  cartCount: number;
  isOpen: boolean;           // <--- FALTABA ESTO
  setIsOpen: (val: boolean) => void; // <--- Y ESTO
}

// Creamos el contexto vacío
export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  // ESTADOS
  const [cart, setCart] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false); // <--- ESTADO PARA ABRIR/CERRAR

  // Recuperar carrito de LocalStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Guardar en LocalStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // FUNCIONES
  const addToCart = (product: any, size: string) => {
    const numericPrice = Number(product.price); 

    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.id === product.id && item.size === size
      );

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevCart,
          { ...product, price: numericPrice, quantity: 1, size },
        ];
      }
    });

    setIsOpen(true); // Abrimos el carrito al agregar algo
  };

  const removeFromCart = (id: string, size: string) => {
    setCart((prevCart) => prevCart.filter((item) => !(item.id === id && item.size === size)));
  };

  // CALCULOS
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        total, 
        cartCount,
        isOpen,      // <--- AGREGAMOS ESTO AL ENVÍO
        setIsOpen    // <--- Y ESTO TAMBIÉN
      }}
    >
      {children}
    </CartContext.Provider>
  );
}