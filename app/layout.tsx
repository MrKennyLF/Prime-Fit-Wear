import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Cart from "../components/Cart";
import { CartProvider } from "../context/CartContext"; // Importamos la lógica del estado

// Configuración de fuentes (Google Fonts)
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata: Metadata = {
  title: "PRIME FIT WEAR",
  description: "Ropa deportiva de alto rendimiento y estilo urbano.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${oswald.variable} font-sans bg-[#050505] text-white`}>
        
        {/* CartProvider envuelve A TODO. 
          Así, cualquier parte de la app (Navbar, Páginas, Botones) 
          puede acceder al carrito.
        */}
        <CartProvider>
          
          {/* El Navbar siempre visible arriba */}
          <Navbar />
          
          {/* El Carrito (Drawer) siempre listo para deslizarse */}
          <Cart />

          {/* Aquí se renderiza el contenido de cada página (page.tsx) */}
          {children}

        </CartProvider>
        
      </body>
    </html>
  );
}