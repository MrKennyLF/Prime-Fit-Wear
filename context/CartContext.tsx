"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// Definimos cómo se ve un producto DENTRO del carrito
interface CartItem {
  id: number;
  name: string;
  price: number; // Lo guardaremos como número para sumar fácil
  image: string;
  size: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any, size: string) => void;
  removeFromCart: (id: number, size: string) => void;
  total: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Cargar carrito guardado al iniciar (para que no se pierda al recargar página)
  useEffect(() => {
    const savedCart = localStorage.getItem('prime-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Guardar cada vez que cambia el carrito
  useEffect(() => {
    localStorage.setItem('prime-cart', JSON.stringify(cart));
  }, [cart]);

  // FUNCIÓN: Agregar al carrito
  const addToCart = (product: any, size: string) => {
    // Limpiamos el precio (quitamos el signo $ y MXN para poder sumar matemáticas)
    const numericPrice = parseFloat(product.price.replace(/[^0-9.]/g, ''));

    setCart((prevCart) => {
      // ¿Ya existe este producto con ESA misma talla?
      const existingItem = prevCart.find((item) => item.id === product.id && item.size === size);

      if (existingItem) {
        // Si existe, solo aumentamos la cantidad
        return prevCart.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si no existe, lo agregamos nuevo
        return [...prevCart, {
          id: product.id,
          name: product.name,
          price: numericPrice,
          image: product.images[0],
          size: size,
          quantity: 1
        }];
      }
    });
  };

  // FUNCIÓN: Quitar del carrito
  const removeFromCart = (id: number, size: string) => {
    setCart((prevCart) => prevCart.filter((item) => !(item.id === id && item.size === size)));
  };

  // CÁLCULOS: Total a pagar y Cantidad de items
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, total, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook para usar el carrito fácilmente en cualquier parte
export const useCart = () => useContext(CartContext);