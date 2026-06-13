import React, { useState } from 'react';
import { Cuestionario, User } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface SolventacionesProps {
  cuestionarios: Cuestionario[];
  user: User;
  onSaveSolventacion: (id: string, text: string) => void;
}

export const Solventaciones: React.FC<SolventacionesProps> = ({ cuestionarios, user, onSaveSolventacion }) => {
  const [selectedCuestionario, setSelectedCuestionario] = useState<Cuestionario | null>(null);
  const [solventarText, setSolventarText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const rawData = user.role === 'admin' 
    ? cuestionarios 
    : cuestionarios.filter(c => c.usuario === user.email);

  const handleOpenSolventar = (item: Cuestionario) => {
    setSelectedCuestionario(item);
    setSolventarText(item.solventacion?.texto || '');
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!selectedCuestionario) return;
    onSaveSolventacion(selectedCuestionario.id, solventarText);
    setIsModalOpen(false);
    setSelectedCuestionario(null);
    setSolventarText('');
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden font-sans">
      
      <div className="p-6 border-b border-neutral-100 bg-[#fcfdfd]">
        <h3 className="text-base font-bold text-neutral-800">Módulo de Solventaciones Especiales</h3>
        <p className="text-xs text-neutral-500 mt-0.5">Gestión y desahogo de observaciones metodológicas formuladas por la Subsecretaría de Administración</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#fcfdfd] border-b border-neutral-200">
            <tr>
              <th className="px-6 py-3.5 text-xs font-bold text-neutral-500 uppercase tracking-widest">Folio</th>
              <th className="px-6 py-3.5 text-xs font-bold text-neutral-500 uppercase tracking-widest">Dependencia</th>
              <th className="px-6 py-3.5 text-xs font-bold text-neutral-500 uppercase tracking-widest">Último Cambio</th>
              <th className="px-6 py-3.5 text-xs font-bold text-neutral-500 uppercase tracking-widest">Estado Solventación</th>
              <th className="px-6 py-3.5 text-xs font-bold text-neutral-500 uppercase tracking-widest text-right">Acción Técnica</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 text-xs">
            {rawData.length > 0 ? (
              rawData.map((d) => (
                <tr key={d.id} className="hover:bg-neutral-50/50 transition">
                  <td className="px-6 py-4 font-bold text-slate-900 font-mono tracking-wide">{d.folio}</td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-neutral-800">{d.dependencia}</span>
                    <span className="block text-[10px] text-neutral-400 mt-0.5 font-mono truncate">{d.usuario}</span>
                  </td>
                  <td className="px-6 py-4 text-neutral-500 font-mono">
                    {new Date(d.fecha).toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4">
                    {d.solventacion ? (
                      <div className="space-y-1 max-w-[280px]">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-bold text-emerald-800 bg-emerald-50 rounded border border-emerald-150 uppercase tracking-wider">
                          Solventado
                        </span>
                        <p className="text-[10px] text-stone-500 font-medium truncate" title={d.solventacion.texto}>
                          "{d.solventacion.texto}"
                        </p>
                      </div>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-bold text-amber-800 bg-amber-50 rounded border border-amber-150 uppercase tracking-wider">
                        Pendiente de atención
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleOpenSolventar(d)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer ${d.solventacion ? 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700' : 'bg-slate-900 hover:bg-slate-800 text-white hover:shadow-md'}`}
                    >
                      {d.solventacion ? 'Modelar Solventación' : 'Iniciar Solventación'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-neutral-500 font-medium font-sans">
                  No cuenta con cuestionarios registrados en el sistema para catalogar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ANIME PRESENCE DIALOG MODAL */}
      <AnimatePresence>
        {isModalOpen && selectedCuestionario && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop cover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            ></motion.div>

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-xl border border-neutral-100 overflow-hidden relative z-10"
            >
              {/* Modal header */}
              <div className="relative bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white px-6 py-5">
                <div className="absolute top-0 left-0 w-full h-[5px] bg-[#C09440]"></div>
                <span className="text-[10px] bg-white/10 px-2.5 py-0.5 rounded-full font-mono uppercase tracking-widest font-bold">
                  FOLIO DE TRÁMITE: {selectedCuestionario.folio}
                </span>
                <h4 className="text-base font-bold mt-1.5">Desahogo Metodológico y Solventación</h4>
                <p className="text-neutral-200 text-xs mt-0.5">Ingrese las consideraciones legales o técnicas que solventan lo reportado.</p>
              </div>

              {/* Modal form */}
              <div className="p-6 space-y-4">
                <div className="bg-zinc-50 rounded-xl p-4 border border-neutral-200 text-xs text-neutral-700 space-y-2.5">
                  <p><strong>Dependencia:</strong> {selectedCuestionario.dependencia}</p>
                  <p><strong>Tipo Documental:</strong> {selectedCuestionario.tipo}</p>
                  <p><strong>Enlace Registrado:</strong> {selectedCuestionario.p1}</p>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="solventacion-txt" className="block text-xs font-bold text-neutral-700 uppercase">
                    Comentarios y Plan de Acción de la Solventación
                  </label>
                  <textarea
                    id="solventacion-txt"
                    rows={4}
                    required
                    placeholder="Describa pormenorizadamente los cambios y las correcciones del manual conforme la metodología oficial o la motivación técnica..."
                    value={solventarText}
                    onChange={(e) => setSolventarText(e.target.value)}
                    className="w-full bg-white rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs focus:ring-4 focus:ring-slate-900/10 focus:border-slate-900 text-neutral-800 outline-none"
                  />
                  <p className="text-[9px] text-neutral-400">Su solventación será registrada en tiempo real con firma pública e histórica de su clave.</p>
                </div>
              </div>

              {/* Modal actions */}
              <div className="px-6 py-4 border-t border-neutral-100 flex justify-end gap-2.5 bg-neutral-50/70">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-neutral-300 rounded-xl hover:bg-neutral-100 text-neutral-700 font-bold text-xs"
                >
                  CANCELAR
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-5 py-2 bg-[#0f172a] hover:bg-[#1e293b] text-white rounded-xl font-bold text-xs shadow-md transition-transform transform active:scale-95 cursor-pointer"
                >
                  {selectedCuestionario.solventacion ? 'GUARDAR EDICIÓN' : 'REGISTRAR SOLVENTACIÓN'}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
