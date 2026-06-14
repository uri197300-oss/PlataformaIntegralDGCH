import React from 'react';

export const Footer: React.FC = () => {
  // Talavera flower motif SVG
  const TalaveraMotif = () => (
    <svg className="w-8 h-8 text-slate-350 shrink-0 opacity-40 hover:opacity-80 transition-opacity" viewBox="0 0 100 100" fill="currentColor">
      {/* Central Diamond and flower center */}
      <rect x="42" y="42" width="16" height="16" transform="rotate(45 50 50)" fill="#C09440" />
      <circle cx="50" cy="50" r="4" fill="#f8fafc" />
      
      {/* 4 Large Petals */}
      <path d="M50 15 C40 25, 40 40, 50 40 C60 40, 60 25, 50 15 Z" fill="#475569" />
      <path d="M50 85 C40 75, 40 60, 50 60 C60 60, 60 75, 50 85 Z" fill="#475569" />
      <path d="M15 50 C25 40, 40 40, 40 50 C40 60, 25 60, 15 50 Z" fill="#475569" />
      <path d="M85 50 C75 40, 60 40, 60 50 C60 60, 75 60, 85 50 Z" fill="#475569" />
      
      {/* Diagonal Leaf accents */}
      <circle cx="32" cy="32" r="5" fill="#C09440" />
      <circle cx="68" cy="32" r="5" fill="#C09440" />
      <circle cx="32" cy="68" r="5" fill="#C09440" />
      <circle cx="68" cy="68" r="5" fill="#C09440" />
      
      {/* Fine lines linking petals */}
      <circle cx="50" cy="22" r="2" fill="#f8fafc" />
      <circle cx="50" cy="78" r="2" fill="#f8fafc" />
      <circle cx="22" cy="50" r="2" fill="#f8fafc" />
      <circle cx="78" cy="50" r="2" fill="#f8fafc" />
    </svg>
  );

  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-6 mt-12 w-full relative font-sans">
      {/* Decorative Talavera tile strip as running watermark */}
      <div className="w-full bg-slate-100/80 border-b border-t border-slate-200/50 py-1 mb-6 overflow-hidden flex items-center justify-between gap-1 select-none">
        {/* We repeat the pattern enough times to fill screens (e.g. 42 times) */}
        <div className="flex gap-2 items-center justify-center w-full animate-marquee">
          {Array.from({ length: 42 }).map((_, index) => (
            <TalaveraMotif key={index} />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Puebla Seals */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 border-r border-slate-200 pr-4">
              <svg className="h-8 w-7 text-[#C09440]" viewBox="0 0 100 110" fill="currentColor">
                <path d="M50 0 C40 10, 15 15, 15 45 C15 75, 35 95, 50 110 C65 95, 85 75, 85 45 C85 15, 60 10, 50 0 Z" fill="#C09440" />
                <path d="M50 5 C43 14, 20 18, 20 45 C20 71, 37 89, 50 102 C63 89, 80 71, 80 45 C80 18, 57 14, 50 5 Z" fill="#f8fafc" />
                <path d="M50 15 L50 90 M25 45 L75 45" stroke="#475569" strokeWidth="4" />
                <circle cx="50" cy="45" r="8" fill="#C09440" />
              </svg>
              <div className="flex flex-col text-[#475569]">
                <span className="text-[9px] font-black leading-none opacity-80">GOBIERNO DEL</span>
                <span className="text-xs font-black tracking-tight leading-none text-slate-800">ESTADO DE PUEBLA</span>
                <span className="text-[8px] font-semibold tracking-widest text-[#C09440] mt-0.5 leading-none">2024 - 2030</span>
              </div>
            </div>
            
            <div className="flex flex-col text-slate-500 text-[10px]">
              <span className="font-bold text-slate-700">Subsecretaría de Administración</span>
              <span>Dirección General de Capital Humano</span>
            </div>
          </div>

          {/* Right: Technical info and credits */}
          <div className="text-center md:text-right text-xs text-slate-500 font-sans">
            <p className="font-semibold text-slate-700 uppercase tracking-wider text-[10px]">Sistema Certificado de Cuestionarios y Gestión</p>
            <p className="mt-1">© {new Date().getFullYear()} Gobierno del Estado de Puebla. Reservados todos los derechos oficiales.</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Estación de Trabajo Autorizada | Departamento de Innovación Administrativa.</p>
          </div>

        </div>
      </div>
    </footer>
  );
};
