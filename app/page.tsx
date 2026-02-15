"use client";

import React, { useState } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Home() {
  // ESTADOS PARA LOS FILTROS
  const [filterCategory, setFilterCategory] = useState("Todos");
  const [filterGender, setFilterGender] = useState("Todos");
  const [showFilters, setShowFilters] = useState(false); // Para abrir/cerrar el panel

  // LISTAS DE OPCIONES (Puedes agregar más aquí)
  const categories = ["Todos", "Oversize", "Baggys", "Sudaderas", "Chamarra"];
  const genders = ["Todos", "Hombre", "Mujer", "Unisex"];

  // LÓGICA DE FILTRADO
  const filteredProducts = products.filter((product) => {
    // Si la categoría no es "Todos", debe coincidir con la del producto
    const categoryMatch = filterCategory === "Todos" || product.category === filterCategory;
    // Si el género no es "Todos", debe coincidir
    const genderMatch = filterGender === "Todos" || product.gender === filterGender;

    return categoryMatch && genderMatch;
  });

  return (
    <main className="min-h-screen bg-[#050505] pb-20">

      {/* SECCIÓN HERO */}
      <section className="h-[50vh] flex flex-col items-center justify-center text-center px-4 pt-20">
       <h1 className="text-6xl md:text-9xl font-oswald font-bold tracking-wide mb-4 text-white uppercase italic">
  PRIME <span className="text-[#00f2ff]">FIT</span> WEAR
</h1>
        <p className="text-gray-400 text-lg md:text-xl tracking-[0.3em] uppercase max-w-2xl">
          Entrena duro, Viste mejor.
        </p>
      </section>

      {/* --- SECCIÓN DE FILTROS --- */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-8 sticky top-20 z-40">

        {/* Botón para desplegar filtros */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-[#111] text-white px-6 py-3 rounded border border-gray-800 hover:border-[#00f2ff] transition-all uppercase tracking-widest text-sm font-bold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#00f2ff]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>
            {showFilters ? "Ocultar Filtros" : "Filtrar Ropa"}
          </button>
        </div>

        {/* Panel Desplegable */}
        {showFilters && (
          <div className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-lg mb-8 shadow-2xl animate-in slide-in-from-top-2 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Filtro por Categoría */}
              <div>
                <h3 className="text-[#00f2ff] font-bold uppercase tracking-wider mb-3 text-sm">Categoría</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilterCategory(cat)}
                      className={`px-4 py-2 rounded text-sm transition-all ${filterCategory === cat
                          ? 'bg-[#00f2ff] text-black font-bold'
                          : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filtro por Género */}
              <div>
                <h3 className="text-[#00f2ff] font-bold uppercase tracking-wider mb-3 text-sm">Género</h3>
                <div className="flex flex-wrap gap-2">
                  {genders.map((gen) => (
                    <button
                      key={gen}
                      onClick={() => setFilterGender(gen)}
                      className={`px-4 py-2 rounded text-sm transition-all ${filterGender === gen
                          ? 'bg-white text-black font-bold'
                          : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
                        }`}
                    >
                      {gen}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Resumen de resultados */}
            <div className="mt-6 pt-4 border-t border-gray-800 text-xs text-gray-500 flex justify-between items-center">
              <span>Mostrando {filteredProducts.length} productos</span>
              {(filterCategory !== "Todos" || filterGender !== "Todos") && (
                <button
                  onClick={() => { setFilterCategory("Todos"); setFilterGender("Todos"); }}
                  className="text-red-500 hover:underline"
                >
                  Borrar Filtros
                </button>
              )}
            </div>
          </div>
        )}
      </section>

      {/* --- GRID DE PRODUCTOS --- */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Mensaje si no hay resultados */
          <div className="text-center py-20 bg-[#0a0a0a] rounded border border-dashed border-gray-800">
            <p className="text-gray-400 text-xl">No encontramos productos con esos filtros.</p>
            <button
              onClick={() => { setFilterCategory("Todos"); setFilterGender("Todos"); }}
              className="mt-4 text-[#00f2ff] underline"
            >
              Ver todo el catálogo
            </button>
          </div>
        )}
      </section>

    </main>
  );
}