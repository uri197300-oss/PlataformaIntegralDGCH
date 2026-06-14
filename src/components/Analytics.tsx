import React, { useState } from 'react';
import { Cuestionario, User } from '../types';
import { motion, AnimatePresence } from 'motion/react';

const PREGUNTAS_MAP = [
  { key: 'p1' as const, num: 1, label: '¿Quién es el enlace designado oficialmente para la elaboración de manuales en su dependencia?' },
  { key: 'p2' as const, num: 2, label: '¿Tiene dudas o inquietudes particulares sobre la metodología de la Dirección de Capital Humano?' },
  { key: 'p3' as const, num: 3, label: '¿Cuál es su principal obstáculo al redactar la redacción del objetivo y el alcance de un procedimiento?' },
  { key: 'p4' as const, num: 4, label: 'En el último periodo de observaciones de la DGCH, ¿cuántos días tardó aproximadamente en solventar?' },
  { key: 'p6' as const, num: 5, label: '¿Cuáles son las discrepancias actuales en la estructura de puestos (Validados vs Autorizados)?' },
  { key: 'p7' as const, num: 6, label: '¿Con cuántos procedimientos vigentes cuenta su Dirección General que urjan actualización?' },
  { key: 'p8' as const, num: 7, label: '¿Cuenta el área con Reglamento Interior debidamente publicado y vigente en el Periódico Oficial?' },
  { key: 'p9' as const, num: 8, label: 'Identifique los mayores "cuellos de botella" en el proceso de revisión metodológica interna:' },
  { key: 'p10' as const, num: 9, label: '¿El personal operativo a su cargo conoce plenamente la Visión y Misión institucional?' },
  { key: 'p11' as const, num: 10, label: '¿Cuál es la frecuencia común de revisión técnica de sus procesos de operation interna?' },
  { key: 'p12' as const, num: 11, label: '¿Qué porcentaje aproximado de los manuales del área se encuentran digitalizados y en intranet?' },
  { key: 'p5' as const, num: 12, label: '¿Cuáles son sus propuestas de mejora o comentarios adicionales para agilizar este proceso de control?' },
];

interface AnalyticsProps {
  cuestionarios: Cuestionario[];
  user: User;
}

export const Analytics: React.FC<AnalyticsProps> = ({ cuestionarios, user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [exerciseFilter, setExerciseFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [viewingCuestionario, setViewingCuestionario] = useState<Cuestionario | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Filter dataset based on permissions and input criteria
  const userRole = user.role;
  const rawData = userRole === 'admin' 
    ? cuestionarios 
    : cuestionarios.filter(c => c.usuario === user.email);

  const filteredData = rawData.filter(d => {
    const matchesSearch = d.folio.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          d.dependencia.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.usuario.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExercise = exerciseFilter === 'All' || d.ejercicio === exerciseFilter;
    const matchesType = typeFilter === 'All' || d.tipo === typeFilter;
    return matchesSearch && matchesExercise && matchesType;
  });

  const totalCount = filteredData.length;
  const solventadosCount = filteredData.filter(d => d.solventacion).length;
  const pendientesCount = totalCount - solventadosCount;
  const mOrgCount = filteredData.filter(d => d.tipo === 'MANUAL DE ORGANIZACIÓN').length;
  const mProcCount = filteredData.filter(d => d.tipo === 'MANUAL DE PROCEDIMIENTOS').length;
  const otherCount = totalCount - (mOrgCount + mProcCount);

  // Simple percentage calculation
  const solventadoPct = totalCount > 0 ? Math.round((solventadosCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-6 font-sans">
      
      {/* 4 Summary Scorecards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <motion.div 
          whileHover={{ y: -3 }}
          className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Total Trámites</p>
            <p className="text-3xl font-extrabold text-[#0f172a] mt-1">{totalCount}</p>
            <p className="text-[10px] text-neutral-500 mt-1">Registrados en la adscripción</p>
          </div>
          <div className="p-3.5 bg-neutral-100 rounded-xl text-neutral-600 shrink-0">
            <svg className="w-6 h-6 text-[#C09440]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
        </motion.div>

        {/* Metric 2 */}
        <motion.div 
          whileHover={{ y: -3 }}
          className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Solventados</p>
            <p className="text-3xl font-extrabold text-emerald-800 mt-1">{solventadosCount}</p>
            <span className="inline-block px-2 py-0.5 mt-1 text-[10px] bg-emerald-50 text-emerald-700 font-bold rounded">
              {solventadoPct}% Eficacia
            </span>
          </div>
          <div className="p-3.5 bg-emerald-50 rounded-xl text-emerald-700">
            <svg className="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </motion.div>

        {/* Metric 3 */}
        <motion.div 
          whileHover={{ y: -3 }}
          className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Pendientes</p>
            <p className="text-3xl font-extrabold text-amber-800 mt-1">{pendientesCount}</p>
            <p className="text-[10px] text-amber-600 mt-1">Requieren atención integral</p>
          </div>
          <div className="p-3.5 bg-amber-50 rounded-xl text-amber-700">
            <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </motion.div>

        {/* Metric 4 */}
        <motion.div 
          whileHover={{ y: -3 }}
          className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Por Manual</p>
            <p className="text-lg font-extrabold text-neutral-800 mt-1 select-none">
              MOG: <span className="text-slate-900">{mOrgCount}</span> | MAP: <span className="text-emerald-700">{mProcCount}</span>
            </p>
            <p className="text-[10px] text-neutral-500 mt-1">Otros reglamentos: {otherCount}</p>
          </div>
          <div className="p-3.5 bg-stone-50 rounded-xl text-[#C09440]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
          </div>
        </motion.div>

      </div>

      {/* Advanced SVG charts block for executive visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left chart: Status distribution */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
            {/* Simple CSS-SVG Donut chart */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 42 42">
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#f3f4f6" strokeWidth="5.5" />
              {totalCount > 0 && (
                <circle 
                  cx="21" 
                  cy="21" 
                  r="15.915" 
                  fill="transparent" 
                  stroke="#10b981" 
                  strokeWidth="5.5" 
                  strokeDasharray={`${solventadoPct} ${100 - solventadoPct}`} 
                  strokeDashoffset="0" 
                />
              )}
            </svg>
            <div className="absolute text-center">
              <span className="text-2xl font-black text-neutral-800">{solventadoPct}%</span>
              <p className="text-[9px] text-neutral-400 uppercase tracking-widest font-bold">Solventado</p>
            </div>
          </div>
          <div className="space-y-3 w-full">
            <h4 className="font-bold text-sm text-neutral-800 uppercase tracking-wider">Cuestionarios por Estatus</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between border-b pb-1.5">
                <span className="flex items-center gap-2 text-stone-600">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
                  Solventados (Aprobados)
                </span>
                <span className="font-bold text-stone-800">{solventadosCount} registros</span>
              </div>
              <div className="flex items-center justify-between border-b pb-1.5">
                <span className="flex items-center gap-2 text-stone-600">
                  <span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span>
                  Pendiente (Aclaración)
                </span>
                <span className="font-bold text-stone-800">{pendientesCount} registros</span>
              </div>
              <div className="text-[11px] text-stone-400">
                Los cuestionarios sin solventar son auditados periódicamente por la Dirección de Capital Humano del Estado de Puebla.
              </div>
            </div>
          </div>
        </div>

        {/* Right chart: Representation by Document Type */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col justify-between">
          <h4 className="font-bold text-sm text-neutral-800 uppercase tracking-wider mb-4">Cuestionarios por Tipo de Trámite</h4>
          <div className="space-y-3.5">
            {[
              { label: 'Manual de Organización (MOG)', count: mOrgCount, color: 'bg-[#0f172a]' },
              { label: 'Manual de Procedimientos (MAP)', count: mProcCount, color: 'bg-emerald-700' },
              { label: 'Otros Reglamentos / Estructuras', count: otherCount, color: 'bg-amber-600' }
            ].map((item, idx) => {
              const itemPct = totalCount > 0 ? (item.count / totalCount) * 100 : 0;
              return (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex items-center justify-between font-medium">
                    <span className="text-neutral-700">{item.label}</span>
                    <span className="font-bold text-neutral-900">{item.count} ({Math.round(itemPct)}%)</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color} rounded-full`} 
                      style={{ width: `${itemPct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* FILTER & DATA TABLE BLOCK */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        
        {/* Table Filters */}
        <div className="p-5 border-b border-neutral-100 bg-[#fcfdfd] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:max-w-xs shadow-sm">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Buscar por folio, correo o depto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-slate-900/10 focus:border-slate-900 text-slate-800 font-sans"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Exercise filter */}
            <select
              value={exerciseFilter}
              onChange={(e) => setExerciseFilter(e.target.value)}
              className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl text-slate-800 outline-none focus:ring-4 focus:ring-slate-900/10 focus:border-slate-900 cursor-pointer"
            >
              <option value="All">Todos los ejercicios</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
            </select>

            {/* Type filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl text-slate-800 outline-none focus:ring-4 focus:ring-slate-900/10 focus:border-slate-900 cursor-pointer"
            >
              <option value="All">Todos los documentos</option>
              <option value="MANUAL DE ORGANIZACIÓN">MANUAL DE ORGANIZACIÓN (MOG)</option>
              <option value="MANUAL DE PROCEDIMIENTOS">MANUAL DE PROCEDIMIENTOS (MAP)</option>
              <option value="MANUAL DE SERVICIOS AL PÚBLICO">MANUAL DE SERVICIOS AL PÚBLICO</option>
              <option value="REGLAMENTO INTERIOR">REGLAMENTO INTERIOR</option>
              <option value="ESTRUCTURA ORGÁNICA">ESTRUCTURA ORGÁNICA</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#fcfdfd] border-b border-neutral-200">
              <tr>
                <th className="px-6 py-3.5 text-xs font-bold text-neutral-500 uppercase tracking-widest">Folio</th>
                <th className="px-6 py-3.5 text-xs font-bold text-neutral-500 uppercase tracking-widest">Ejercicio</th>
                <th className="px-6 py-3.5 text-xs font-bold text-neutral-500 uppercase tracking-widest">Tipo</th>
                <th className="px-6 py-3.5 text-xs font-bold text-neutral-500 uppercase tracking-widest">Dependencia</th>
                <th className="px-6 py-3.5 text-xs font-bold text-neutral-500 uppercase tracking-widest">Fecha Envío</th>
                <th className="px-6 py-3.5 text-xs font-bold text-neutral-500 uppercase tracking-widest text-center">Estatus</th>
                <th className="px-6 py-3.5 text-xs font-bold text-neutral-500 uppercase tracking-widest text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 text-xs">
              {filteredData.length > 0 ? (
                filteredData.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition font-sans">
                    <td className="px-6 py-4 font-bold text-slate-900 font-mono tracking-wide">{row.folio}</td>
                    <td className="px-6 py-4 text-stone-600 font-medium">{row.ejercicio}</td>
                    <td className="px-6 py-4 text-stone-600 font-semibold max-w-[180px] truncate" title={row.tipo}>{row.tipo}</td>
                    <td className="px-6 py-4 text-neutral-800 font-medium max-w-[200px] truncate" title={row.dependencia}>
                      {row.dependencia}
                      <span className="block text-[9px] text-neutral-400 font-normal font-mono truncate">{row.usuario}</span>
                    </td>
                    <td className="px-6 py-4 text-neutral-500">
                      {new Date(row.fecha).toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold rounded-full ${row.solventacion ? 'bg-emerald-55/60 text-emerald-800 border border-emerald-200' : 'bg-amber-55/60 text-amber-800 border border-amber-200'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${row.solventacion ? 'bg-emerald-600 animate-pulse' : 'bg-amber-600 animate-pulse'}`}></span>
                        {row.solventacion ? 'Solventado' : 'Pendiente'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => {
                          setViewingCuestionario(row);
                          setIsDetailsOpen(true);
                        }}
                        className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all border border-neutral-250 bg-white hover:bg-neutral-50 text-neutral-700 inline-flex items-center gap-1 cursor-pointer active:scale-95 shadow-sm"
                      >
                        <svg className="w-3.5 h-3.5 text-[#C09440]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>Ver Expediente</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-neutral-500 font-medium font-sans">
                    No se encontraron registros de cuestionarios bajo los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* EXPEDIENTE DETALLES DIALOG MODAL */}
      <AnimatePresence>
        {isDetailsOpen && viewingCuestionario && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDetailsOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            ></motion.div>

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl border border-neutral-100 overflow-hidden relative z-10 flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white px-6 py-5 shrink-0">
                <div className="absolute top-0 left-0 w-full h-[5px] bg-[#C09440]"></div>
                <span className="text-[10px] bg-white/10 px-2.5 py-0.5 rounded-full font-mono uppercase tracking-widest font-bold">
                  EXPEDIENTE DE RESPUESTAS: {viewingCuestionario.folio}
                </span>
                <h4 className="text-base font-bold mt-1.5 font-sans">Expediente de Cuestionario de Diagnóstico de Control</h4>
                <p className="text-[11px] text-neutral-300 mt-0.5">Respuestas oficiales capturadas por el enlace operativo para sustento metodológico.</p>
                <button 
                  onClick={() => setIsDetailsOpen(false)} 
                  className="absolute top-5 right-5 text-neutral-400 hover:text-white transition text-2xl cursor-pointer"
                  aria-label="Cerrar modal"
                >
                  &times;
                </button>
              </div>

              {/* Scrollable Answers Container */}
              <div className="p-6 overflow-y-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 font-sans">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Procedencia / Dependencia</span>
                    <span className="text-xs font-bold text-slate-800">{viewingCuestionario.dependencia}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Usuario Capturista / Fecha</span>
                    <span className="text-xs font-bold text-slate-800">{viewingCuestionario.usuario} • {new Date(viewingCuestionario.fecha).toLocaleDateString('es-MX')}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h5 className="text-xs font-bold text-[#C09440] uppercase tracking-wider border-b border-slate-150 pb-1 font-sans">Cuestiones y Respuestas de Control Técnico</h5>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {PREGUNTAS_MAP.map((item) => (
                      <div key={item.key} className="p-3.5 bg-slate-50/50 border border-slate-150 rounded-xl space-y-1 font-sans">
                        <p className="text-[11px] font-bold text-slate-500 leading-tight font-sans">
                          {item.num}. {item.label}
                        </p>
                        <p className="text-xs font-semibold text-slate-800 bg-white p-2.5 rounded-lg border border-slate-150 leading-relaxed min-h-[40px]">
                          {viewingCuestionario[item.key] || 'No especificado'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-2.5 p-4 border-t border-neutral-100 bg-neutral-50/50 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsDetailsOpen(false)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs shadow-md transition cursor-pointer uppercase tracking-wider font-sans focus:outline-none"
                >
                  Cerrar Expediente
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
