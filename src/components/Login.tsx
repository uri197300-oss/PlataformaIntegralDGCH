import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { motion } from 'motion/react';

interface LoginProps {
  onLoginSuccess: (user: User) => void;
}

const DEPENDENCIAS = [
  "Secretaría de Gobernación",
  "Secretaría de Planeación, Finanzas y Administración",
  "Secretaría Anticorrupción y Buen Gobierno",
  "Secretaría de Desarrollo Económico y Trabajo",
  "Secretaría de Arte y Cultura",
  "Secretaría de Turismo",
  "Secretaría de Desarrollo Rural",
  "Secretaría de Infraestructura",
  "Secretaría de Movilidad y Transporte",
  "Secretaría de Salud",
  "Secretaría de Educación",
  "Secretaría de Bienestar",
  "Secretaría de Seguridad Pública",
  "Secretaría de Medio Ambiente, Desarrollo Sustentable y Ordenamiento Territorial",
  "Secretaría de las Mujeres",
  "Secretaría de Ciencia, Humanidades, Tecnología e Innovación (SECIHTI)",
  "Secretaría de Deporte y Juventud",
  "Consejería Jurídica"
];

const ADMIN_EMAIL = 'uri197300@gmail.com';
const ADMIN_PASS = '#Donaji18';

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [dependencia, setDependencia] = useState('');
  const [password, setPassword] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Monitor when email changes to toggle admin view
  useEffect(() => {
    const isMatched = email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase();
    setIsAdminMode(isMatched);
    if (!isMatched) {
      setPassword('');
    } else {
      setDependencia('Administración Central');
    }
  }, [email]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formattedEmail = email.trim().toLowerCase();

    if (isAdminMode) {
      if (password === ADMIN_PASS) {
        onLoginSuccess({
          email: formattedEmail,
          dependencia: 'Administración Central',
          role: 'admin',
          loginTime: new Date().toISOString()
        });
      } else {
        setError('La contraseña de administrador es incorrecta.');
      }
    } else {
      if (!formattedEmail) {
        setError('Por favor complete su correo electrónico.');
        return;
      }
      if (!dependencia) {
        setError('Debe seleccionar su Dependencia Gubernamental.');
        return;
      }
      onLoginSuccess({
        email: formattedEmail,
        dependencia,
        role: 'user',
        loginTime: new Date().toISOString()
      });
    }
  };

  return (
    <div className="absolute inset-0 min-h-screen w-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-slate-950 p-4 font-sans overflow-y-auto">
      
      {/* Light decorative elements in background */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#C09440]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#C09440]/5 rounded-full blur-3xl pointer-events-none"></div>
 
      <div className="w-full max-w-lg z-10 my-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200/50"
        >
          {/* Header plate with Puebla emblem and dual claret-gold background */}
          <div className="relative bg-gradient-to-r from-[#0f172a] to-[#1e293b] py-8 px-6 text-white text-center">
            <div className="absolute top-0 left-0 w-full h-[5px] bg-[#C09440]"></div>
            
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 backdrop-blur-md rounded-2xl mb-3 shadow-inner border border-white/10">
              <svg className="w-10 h-10 text-[#C09440]" viewBox="0 0 100 110" fill="currentColor">
                <path d="M50 0 C40 10, 15 15, 15 45 C15 75, 35 95, 50 110 C65 95, 85 75, 85 45 C85 15, 60 10, 50 0 Z" fill="#ffffff" />
                <path d="M50 15 L50 90 M25 45 L75 45" stroke="#1e293b" strokeWidth="6" />
                <circle cx="50" cy="45" r="9" fill="#C09440" />
              </svg>
            </div>
            
            <h1 className="text-xl font-bold tracking-tight">Gobierno del Estado de Puebla</h1>
            <p className="text-slate-300 text-xs tracking-wider uppercase mt-1.5 font-bold">
              Sistema de Cuestionarios y Gestión de Manuales
            </p>
            <span className="inline-block mt-3.5 text-[9px] bg-[#C09440] text-slate-950 font-extrabold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
              DGCH Portal Oficial
            </span>
          </div>
 
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-widest">
                Correo Electrónico Oficial
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  autoFocus
                  placeholder="nombre@puebla.gob.mx"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-900/10 focus:border-slate-900 focus:bg-white transition text-sm font-sans"
                />
              </div>
              <p className="text-[10px] text-slate-400">Ingrese su correo para autenticarse, si es administrador use el correo asignado.</p>
            </div>
 
            {/* If Admin Mode: Show password field. Otherwise, show Dependencia Selector */}
            {isAdminMode ? (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-xs font-bold text-slate-700 uppercase tracking-widest">
                    Contraseña Administrativa
                  </label>
                  <span className="text-[10px] bg-red-50 text-red-700 font-extrabold px-1.5 py-0.5 rounded border border-red-200">
                    Clave Requerida
                  </span>
                </div>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-red-500">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                  </div>
                  <input
                     id="password"
                     type="password"
                     required
                     placeholder="••••••••"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="block w-full pl-11 pr-4 py-3 bg-red-50/10 border border-slate-200 rounded-xl text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition text-sm font-sans"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 1, height: 'auto' }}
                className="space-y-1.5"
              >
                <label htmlFor="dependencia" className="block text-xs font-bold text-slate-700 uppercase tracking-widest">
                  Dependencia o Secretaría de Adscripción
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                  </div>
                  <select
                    id="dependencia"
                    required={!isAdminMode}
                    value={dependencia}
                    onChange={(e) => setDependencia(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-900/10 focus:border-slate-900 focus:bg-white transition text-sm bg-none cursor-pointer"
                  >
                    <option value="">-- Seleccione su Dependencia --</option>
                    {DEPENDENCIAS.map((dep, index) => (
                      <option key={index} value={dep}>{dep}</option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}
 
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 font-medium flex items-start gap-2.5"
              >
                <svg className="w-4.5 h-4.5 shrink-0 text-red-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                <span>{error}</span>
              </motion.div>
            )}
 
            <button
              type="submit"
              className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white py-3 px-4 rounded-xl font-bold tracking-widest text-xs transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2"
            >
              <span>INGRESAR AL PORTAL</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
 
          {/* Institutional disclaimer info */}
          <div className="bg-slate-50 px-8 py-4.5 border-t border-slate-100 text-center text-[10px] text-slate-400 leading-relaxed uppercase tracking-wider font-sans">
            Esta plataforma es de uso exclusivo para funcionarios públicos autorizados del Gobierno del Estado de Puebla. Toda actividad es auditada y registrada.
          </div>
        </motion.div>
      </div>
    </div>
  );
};
