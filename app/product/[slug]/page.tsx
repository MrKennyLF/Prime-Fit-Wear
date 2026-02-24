import React from 'react';
import Link from 'next/link';
import { client } from '@/sanity/lib/client'; 
import ProductGallery from '@/components/ProductGallery';
import AddToCart from '@/components/AddToCart';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  
  // 1. Desenvolvemos los parámetros de forma segura antes de usarlos
  const resolvedParams = await params;
  const currentSlug = resolvedParams.slug;
  
  // 2. Consulta a Sanity (¡AHORA INCLUYE EL VIDEO!)
  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    price,
    description,
    "images": images[].asset->url,
    isNew,
    "videoUrl": video.asset->url
  }`;

  // 3. Hacemos la petición pasándole el currentSlug que ya leímos
  const product = await client.fetch(query, { slug: currentSlug });

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">
        <div className="text-center">
          <h1 className="text-3xl font-oswald mb-4 uppercase italic">Producto no encontrado</h1>
          <Link href="/" className="text-[#00f2ff] hover:underline font-sans">
            ← Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] min-h-screen pt-32 pb-16 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Botón de regresar */}
        <Link 
          href="/" 
          className="inline-block text-gray-400 hover:text-[#00f2ff] transition-colors mb-8 font-sans text-sm uppercase tracking-wider"
        >
          ← Volver al catálogo
        </Link>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
          
          {/* LADO IZQUIERDO: Video y Galería Interactiva */}
          <div className="w-full md:w-1/2">
            
            {/* REPRODUCTOR DE VIDEO NEÓN (Solo aparece si el producto tiene video) */}
            {product.videoUrl && (
              <div className="mb-6 rounded-lg overflow-hidden border border-gray-800 shadow-[0_0_15px_rgba(0,242,255,0.2)]">
                <video 
                  src={product.videoUrl} 
                  controls 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  className="w-full h-auto object-cover"
                >
                  Tu navegador no soporta la etiqueta de video.
                </video>
              </div>
            )}

            {/* Galería de imágenes (se queda justo debajo del video) */}
            <ProductGallery images={product.images || []} />
          </div>

          {/* LADO DERECHO: Detalles del Producto */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            
            {product.isNew && (
              <span className="bg-[#00f2ff] text-black text-xs font-bold px-3 py-1 rounded font-oswald w-fit mb-4 uppercase tracking-widest">
                New Drop
              </span>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-oswald font-bold uppercase italic tracking-wide mb-4">
              {product.name}
            </h1>
            
            <p className="text-[#00f2ff] font-oswald text-3xl font-bold mb-8">
              ${product.price?.toLocaleString('es-MX')}
            </p>

            <div className="prose prose-invert mb-10 font-sans text-gray-400 leading-relaxed text-sm md:text-base">
              <p>{product.description}</p>
            </div>

            {/* Botón de Agregar al carrito */}
            <div>
              <AddToCart product={product} />
            </div>

            <div className="mt-8 pt-8 border-t border-gray-800 text-xs text-gray-500 font-sans space-y-2">
              <p>⚡ Pagos seguros. Ropa de importación 100% original.</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}