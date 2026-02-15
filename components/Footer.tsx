import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* COLUMNA 1: Logo Redondo y Slogan */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          {/* Logo con clase 'rounded-full' para hacerlo circular */}
          <img 
            src="/logo.jpeg" 
            alt="Logo Prime Fit" 
            className="h-20 w-20 object-cover rounded-full border-2 border-gray-800 opacity-90" 
          />
          <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
  Ropa deportiva de alto rendimiento diseñada para superar tus límites. 
  <br />
  <span className="text-[#00f2ff] font-bold uppercase tracking-widest">
    Entrena duro, Viste mejor.
  </span>
</p>
        </div>

        {/* COLUMNA 2: Enlaces Rápidos */}
        <div className="space-y-4">
          <h3 className="text-[#00f2ff] font-bold uppercase tracking-wider text-sm">Navegación</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="/" className="hover:text-[#00f2ff] transition-colors">Inicio</a></li>
            <li><a href="#" className="hover:text-[#00f2ff] transition-colors">Catálogo Completo</a></li>
            <li><a href="#" className="hover:text-[#00f2ff] transition-colors">Nuevos Lanzamientos</a></li>
          </ul>
        </div>

        {/* COLUMNA 3: Redes Sociales Oficiales */}
        <div className="space-y-4">
          <h3 className="text-[#00f2ff] font-bold uppercase tracking-wider text-sm">Síguenos</h3>
          <div className="flex justify-center md:justify-start gap-4">
            
            {/* Instagram Oficial */}
            <a 
              href="https://www.instagram.com/pr1me.fw?igsh=MTZzOTFhcDh0N2JtMQ%3D%3D&utm_source=qr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-[#E1306C] hover:text-white transition-all duration-300 border border-gray-800"
              title="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>

            {/* Facebook Oficial */}
            <a 
              href="https://www.facebook.com/share/1AJwXpRA5Y/?mibextid=wwXIfr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all duration-300 border border-gray-800"
              title="Facebook"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>

            {/* TikTok (Pendiente - Placeholder) */}
            <a 
              href="#" 
              className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 border border-gray-800"
              title="TikTok"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
            </a>

          </div>
        </div>

      </div>
      
      {/* Copyright */}
      <div className="text-center mt-12 text-gray-600 text-xs border-t border-gray-900 pt-8">
        © {new Date().getFullYear()} Prime Fit Wear. Todos los derechos reservados.
      </div>
    </footer>
  );
}