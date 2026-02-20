import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Cart from "../components/Cart";
import Footer from "../components/Footer"; // <--- 1. Importamos el Footer
import { CartProvider } from "../context/CartContext";

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
      <body className={`${inter.variable} ${oswald.variable} font-sans bg-[#050505] text-white flex flex-col min-h-screen`}>
        {/* Agregamos 'flex flex-col min-h-screen' arriba para asegurar que el footer siempre esté abajo */}
        <CartProvider>
          
          <Navbar />
          <Cart />

          {/* Envolvemos el children en un div flex-1 para empujar el footer al fondo */}
          <main className="flex-1">
            {children}
          </main>

          {/* 2. Colocamos el Footer al final */}
          <Footer />

        </CartProvider>
      </body>
    </html>
  );
}