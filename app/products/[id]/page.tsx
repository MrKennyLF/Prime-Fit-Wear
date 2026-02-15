"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { products } from '@/data/products';
import Link from 'next/link';
import { useCart } from '@/context/CartContext'; // <--- Importamos el cerebro del carrito

export default function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState<any>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  
  // Obtenemos la función para agregar al carrito
  const { addToCart } = useCart(); 

  // Efecto para encontrar el producto
  useEffect(() => {
    if (params.id) {
      const found = products.find((p) => p.id === Number(params.id));
      setProduct(found);
    }
  }, [params.id]);

  // Función que se ejecuta al dar clic en "Añadir"
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Por favor selecciona una talla antes de agregar.");
      return;
    }
    
    // Agregamos al carrito global
    addToCart(product, selectedSize);
    
    // Feedback para el usuario
    alert(`¡${product.name} (Talla ${selectedSize}) agregado al carrito!`);
  };

  if (!product) return <div className="text-white text-center mt-20">Cargando equipo...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 pt-24">
      {/* Nota: pt-24 es para que la barra de navegación no tape el contenido */}
      
      {/* Botón para regresar */}
      <Link href="/" className="text-gray-500 hover:text-[#00f2ff] mb-8 inline-block uppercase tracking-widest text-sm">
        ← Volver al catálogo
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        
        {/* COLUMNA IZQUIERDA: Galería */}
        <div className="space-y-4">
          <div className="aspect-[4/5] bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
            <img 
              src={product.images[activeImage]} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img: string, index: number) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`flex-shrink-0 w-20 h-24 rounded border-2 overflow-hidden ${
                  activeImage === index ? 'border-[#00f2ff]' : 'border-transparent opacity-50 hover:opacity-100'
                }`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* COLUMNA DERECHA: Info */}
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-2">
              {product.name}
            </h1>
            <p className="text-2xl text-[#00f2ff] font-medium">
              {product.price}
            </p>
          </div>

          <p className="text-gray-400 leading-relaxed">
            {product.description}
          </p>

          {/* Selector de Tallas */}
          <div>
            <h3 className="text-sm text-gray-500 uppercase tracking-widest mb-3">Select Size</h3>
            <div className="flex gap-3">
              {['S', 'M', 'L', 'XL'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 flex items-center justify-center border rounded transition-all ${
                    selectedSize === size 
                      ? 'bg-[#00f2ff] text-black border-[#00f2ff] font-bold' 
                      : 'border-gray-700 text-gray-400 hover:border-gray-500'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Botón de Acción CON LÓGICA */}
          <button 
            onClick={handleAddToCart}
            disabled={!selectedSize} // Deshabilita si no hay talla
            className={`w-full py-4 font-bold uppercase tracking-widest transition-colors mt-4 ${
              selectedSize 
                ? 'bg-white text-black hover:bg-[#00f2ff] cursor-pointer' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            {selectedSize ? 'Añadir al Carrito' : 'Selecciona una talla'}
          </button>

          <div className="pt-8 border-t border-gray-800 text-xs text-gray-500 space-y-2">
            <p>• Envío seguro a todo México</p>
            <p>• Garantía de calidad Prime Fit</p>
          </div>
        </div>

      </div>
    </div>
  );
}