import type { Metadata } from "next";
import { Oswald, Montserrat } from "next/font/google"; // <--- Importamos las fuentes
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Configuración de la fuente para Títulos (Fuerza)
const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

// Configuración de la fuente para Textos (Lectura)
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PRIME FIT WEAR",
  description: "Entrena duro, Viste mejor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${oswald.variable} ${montserrat.variable} antialiased bg-[#050505] text-white`}
      >
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}