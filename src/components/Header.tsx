import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-[#0f172a] text-white border-b border-slate-800 shadow-lg relative overflow-hidden font-sans">
      {/* Top golden-copper premium accent line */}
      <div className="h-[4px] w-full bg-gradient-to-r from-red-700 via-[#C09440] to-slate-900"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Department Identifier */}
        <div className="flex flex-col text-center md:text-left select-none">
          <span className="text-sm font-bold tracking-wider text-slate-100 uppercase font-sans">
            Subsecretaría de Administración
          </span>
          <span className="text-xs text-[#C09440] font-semibold tracking-widest uppercase mt-1">
            Dirección General de Capital Humano
          </span>
        </div>

        {/* Right Side: Institutional Logos & Identity */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          
          {/* Logo 1: Puebla Gobierno del Estado 2024-2030 */}
          <div className="flex items-center gap-2 border-r border-slate-800 pr-4 py-1 h-12">
            {/* Minimal SVG representation of the Puebla Shield */}
            <svg className="h-10 w-9 text-[#C09440]" viewBox="0 0 100 110" fill="currentColor">
              <path d="M50 0 C40 10, 15 15, 15 45 C15 75, 35 95, 50 110 C65 95, 85 75, 85 45 C85 15, 60 10, 50 0 Z" fill="#C09440" />
              <path d="M50 5 C43 14, 20 18, 20 45 C20 71, 37 89, 50 102 C63 89, 80 71, 80 45 C80 18, 57 14, 50 5 Z" fill="#0f172a" />
              {/* Internal abstract representation of shield divisions */}
              <path d="M50 15 L50 90 M25 45 L75 45 M30 30 L70 65" stroke="#C09440" strokeWidth="4" />
              <circle cx="50" cy="45" r="8" fill="#ffffff" />
            </svg>
            <div className="flex flex-col text-slate-100">
              <span className="text-[10px] font-black tracking-tighter leading-none opacity-90">GOBIERNO DEL</span>
              <span className="text-[14px] font-extrabold tracking-tight leading-none text-white">ESTADO</span>
              <span className="text-[8px] font-bold tracking-widest text-[#C09440] mt-0.5 leading-none">2024 - 2030</span>
            </div>
          </div>

          {/* Logo 2: Finanzas */}
          <div className="flex flex-col justify-center border-r border-slate-800 pr-4 h-12">
            <span className="text-[16px] font-black text-white tracking-tight leading-none flex items-center">
              Finanzas
            </span>
            <span className="text-[8px] font-semibold text-slate-400 leading-tight max-w-[130px] mt-1">
              Secretaría de Planeación, Finanzas y Administración
            </span>
          </div>

          {/* Logo 3: Slogan "Por Amor a Puebla" */}
          <div className="flex flex-col justify-center items-center border-r border-slate-800 pr-4 h-12">
            <div className="text-[8px] font-extrabold tracking-widest text-[#C09440] uppercase leading-none">POR</div>
            <div className="flex items-center gap-1">
              <span className="text-[12px] font-black text-white uppercase tracking-tight">AMOR</span>
              <svg className="w-2.5 h-2.5 text-rose-500 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span className="text-[12px] font-black text-white uppercase tracking-tight">A</span>
            </div>
            <div className="text-[13px] font-extrabold text-[#C09440] tracking-tighter leading-none -mt-0.5 select-none font-sans">
              PUEBLA
            </div>
          </div>

          {/* Logo 4: Norma Mexicana de No Discriminación */}
          <div className="flex items-center gap-1.5 h-12">
            <svg className="w-8 h-8 rounded-full border border-slate-700 bg-slate-900/50" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="none" stroke="#C09440" strokeWidth="0.5" />
              {/* Circular texts abstract */}
              <circle cx="50" cy="50" r="35" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" />
              {/* Stylized colorful figures */}
              <circle cx="50" cy="28" r="4.5" fill="#f43f5e" />
              <circle cx="72" cy="42" r="4.5" fill="#3b82f6" />
              <circle cx="64" cy="68" r="4.5" fill="#10b981" />
              <circle cx="36" cy="68" r="4.5" fill="#f59e0b" />
              <circle cx="28" cy="42" r="4.5" fill="#8b5cf6" />
              <path d="M50 35 L50 65 M35 50 L65 50" stroke="#C09440" strokeWidth="1.2" />
            </svg>
            <div className="flex flex-col text-[7px] leading-tight font-sans font-bold text-slate-400 max-w-[65px] uppercase">
              <span>Norma Mexicana</span>
              <span className="text-emerald-400 font-extrabold">Igualdad y No</span>
              <span className="text-rose-400">Discriminación</span>
            </div>
          </div>

        </div>
      </div>

      {/* User Information & Session Details if logged in */}
      {user && (
        <div className="bg-[#121c30] border-t border-slate-800/80 px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-slate-300 font-sans">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              <span className="text-slate-400">Sesión activa: <strong className="text-emerald-300 font-medium">{user.email}</strong></span>
              <span className="text-slate-700">|</span>
              <span className="uppercase text-[9px] font-extrabold px-2 py-0.5 bg-slate-800 text-slate-200 rounded border border-slate-700/60 tracking-wider">
                {user.role === 'admin' ? 'Administrador Central' : user.dependencia}
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
              <span>Ingreso: {new Date(user.loginTime).toLocaleTimeString('es-MX')}</span>
              <button
                onClick={onLogout}
                className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1.5 transition-colors duration-150 outline-none group"
              >
                <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
                Salir del Sistema
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
