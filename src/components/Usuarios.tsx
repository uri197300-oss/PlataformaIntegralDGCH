import React from 'react';
import { User } from '../types';

interface UsuariosProps {
  usuarios: User[];
}

export const Usuarios: React.FC<UsuariosProps> = ({ usuarios }) => {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden font-sans shadow-sm text-sm">
      
      <div className="p-6 border-b border-neutral-100 bg-[#fcfdfd]">
        <h3 className="font-bold text-base text-neutral-800">Bitácora de Usuarios e Ingresos</h3>
        <p className="text-xs text-neutral-500 mt-0.5">Historial oficial de funcionarios acreditados y registro auditado de ingresos al sistema</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#fcfdfd] border-b border-neutral-200">
            <tr>
              <th className="px-6 py-3.5 text-xs font-bold text-neutral-500 uppercase tracking-widest">Funcionario / Correo</th>
              <th className="px-6 py-3.5 text-xs font-bold text-neutral-500 uppercase tracking-widest">Secretaría o Dependencia</th>
              <th className="px-6 py-3.5 text-xs font-bold text-neutral-500 uppercase tracking-widest">Rol Autorizado</th>
              <th className="px-6 py-3.5 text-xs font-bold text-neutral-500 uppercase tracking-widest">Primer Acceso</th>
              <th className="px-6 py-3.5 text-xs font-bold text-neutral-500 uppercase tracking-widest">Último Acceso Activo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 text-xs">
            {usuarios.length > 0 ? (
              usuarios.map((u, index) => {
                const isSystemAdmin = u.role === 'admin' || u.email === 'uri197300@gmail.com';
                return (
                  <tr key={index} className="hover:bg-neutral-50/50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {/* Circle badge */}
                        <span className={`w-2.5 h-2.5 rounded-full ${isSystemAdmin ? 'bg-purple-600 animate-pulse' : 'bg-emerald-500 animate-pulse'}`}></span>
                        <span className="font-bold text-neutral-800">{u.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-stone-600 font-semibold">{u.dependencia}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2.5 py-0.5 text-[9px] font-black uppercase rounded tracking-wider border ${isSystemAdmin ? 'bg-purple-50 text-purple-800 border-purple-200' : 'bg-stone-100 text-stone-700 border-stone-200'}`}>
                        {isSystemAdmin ? 'ADMINISTRADOR' : 'ENLACE GENERAL'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-neutral-500">
                      {u.firstLogin ? new Date(u.firstLogin).toLocaleString('es-MX', { dateStyle: 'short', timeStyle: 'short' }) : '—'}
                    </td>
                    <td className="px-6 py-4 text-neutral-550 font-bold font-mono">
                      {u.lastLogin ? new Date(u.lastLogin).toLocaleString('es-MX', { dateStyle: 'short', timeStyle: 'short' }) : '—'}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-neutral-500">
                  No hay bitácora de usuarios autenticados todavía.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};
