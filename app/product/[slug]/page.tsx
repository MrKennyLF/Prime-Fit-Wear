"use client";

import React, { useEffect, useState, useContext, use } from 'react'; // <--- 1. Importamos 'use'
import { client } from '@/sanity/lib/client';
import { CartContext } from '@/context/CartContext';

// Función para obtener datos de un solo producto
async function getProduct(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]{
    "id": _id,
    name,
    price,
    description,
    category,
    "images": images[].asset->url,
    isNew
  }`;
  return client.fetch(query);
}

// 2. Definimos que params ahora es una PROMESA
export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  // 3. Desempaquetamos el slug usando el hook 'use'
  const { slug } = use(params);

  const [product, setProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(true);
  
  const context = useContext(CartContext);
  if (!context) throw new Error("Falta CartProvider");
  const { addToCart } = context;

  // Cargar el producto al entrar
  useEffect(() => {
    // Ahora usamos la variable 'slug' ya limpia, no 'params.slug'
    getProduct(slug).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [slug]); // <--- Dependencia actualizada

  if (loading) return <div className="min-h-screen bg-[#050505] text-white pt-40 text-center font-oswald animate-pulse">CARGANDO PRENDA...</div>;
  if (!product) return <div className="min-h-screen bg-[#050505] text-white pt-40 text-center">Producto no encontrado</div>;

  const handleAddToCart = () => {
    if (!selectedSize) return alert("¡Por favor selecciona una talla!");
    
    addToCart({ ...product, quantity: 1, price: product.price }, selectedSize);
    alert("¡Agregado al carrito!");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* COLUMNA IZQUIERDA: FOTO */}
        <div className="relative aspect-[3/4] bg-[#111] rounded-lg overflow-hidden border border-gray-800">
           <img 
             src={product.images[0]} 
             alt={product.name} 
             className="w-full h-full object-cover"
           />
        </div>

        {/* COLUMNA DERECHA: INFO Y TALLAS */}
        <div className="flex flex-col justify-center">
          <span className="text-[#00f2ff] font-bold tracking-widest uppercase mb-2 text-sm">{product.category}</span>
          <h1 className="text-5xl md:text-7xl font-oswald font-bold uppercase italic mb-6 leading-tight">
            {product.name}
          </h1>
          
          <p className="text-gray-400 text-lg mb-8 font-sans leading-relaxed">
            {product.description}
          </p>

          <div className="text-3xl font-oswald font-bold text-white mb-8 border-b border-gray-800 pb-8">
            ${product.price.toLocaleString('es-MX')} MXN
          </div>

          {/* SELECCIÓN DE TALLA */}
          <div className="mb-8">
            <h3 className="font-bold mb-4 font-oswald tracking-wide text-gray-300">SELECCIONAR TALLA:</h3>
            <div className="flex gap-4">
              {['S', 'M', 'L', 'XL'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-14 h-14 flex items-center justify-center font-bold border transition-all ${
                    selectedSize === size 
                      ? 'bg-[#00f2ff] text-black border-[#00f2ff] shadow-[0_0_15px_rgba(0,242,255,0.5)]' 
                      : 'bg-transparent border-gray-600 text-gray-400 hover:border-white hover:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* BOTÓN AGREGAR */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-white text-black font-oswald font-bold text-xl py-4 hover:bg-[#00f2ff] transition-all uppercase tracking-widest"
          >
            AGREGAR AL CARRITO
          </button>
        </div>

      </div>
    </div>
  );
}