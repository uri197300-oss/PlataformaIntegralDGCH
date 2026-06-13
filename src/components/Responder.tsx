import React, { useState } from 'react';
import { User, Cuestionario } from '../types';
import { motion } from 'motion/react';

interface ResponderProps {
  user: User;
  onSaveCuestionario: (data: Omit<Cuestionario, 'id' | 'usuario' | 'dependencia' | 'fecha' | 'estado'>) => void;
}

export const Responder: React.FC<ResponderProps> = ({ user, onSaveCuestionario }) => {
  const [ejercicio, setEjercicio] = useState('2027');
  const [folio, setFolio] = useState('');
  const [tipo, setTipo] = useState('MANUAL DE BIENESTAR Y PROCEDIMIENTOS');
  
  // 12 answers
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const [p3, setP3] = useState('');
  const [p4, setP4] = useState('');
  const [p5, setP5] = useState('');
  const [p6, setP6] = useState('');
  const [p7, setP7] = useState('');
  const [p8, setP8] = useState('Sí, actualizado y publicado en Periódico Oficial');
  const [p9, setP9] = useState('');
  const [p10, setP10] = useState('');
  const [p11, setP11] = useState('Anual');
  const [p12, setP12] = useState('50%');

  const [message, setMessage] = useState<string | null>(null);

  // Auto-generate folio example based on time and ejercicio
  const handleAutoFolio = () => {
    const num = Math.floor(Math.random() * 900) + 100;
    const initial = user.dependencia.split(' ').map(w => w[0]).join('').substring(0, 4).toUpperCase();
    setFolio(`PUE-${initial}-${ejercicio}-${num}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!folio.trim()) {
      setMessage('El folio es requerido.');
      return;
    }
    
    onSaveCuestionario({
      ejercicio,
      folio: folio.trim().toUpperCase(),
      tipo,
      p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12
    });

    setMessage('Cuestionario guardado y catalogado exitosamente en el sistema de control interno.');
    
    // Clear inputs except metadata
    setP1(''); setP2(''); setP3(''); setP4(''); setP5('');
    setP6(''); setP7(''); setP9(''); setP10('');
    
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleClear = () => {
    setP1(''); setP2(''); setP3(''); setP4(''); setP5('');
    setP6(''); setP7(''); setP9(''); setP10('');
    setFolio('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden font-sans">
      
      {/* Decorative header ribbon */}
      <div className="bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 px-6 sm:px-8 py-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-800 tracking-tight uppercase">Cuestionario de Diagnóstico y Cumplimiento</h2>
          <p className="text-[11px] text-slate-500 mt-0.5">Control Interno sobre la Elaboración, Dictaminación y Vigencia de Manuales Administrativos</p>
        </div>
        <button
          type="button"
          onClick={handleAutoFolio}
          className="bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold py-2 px-3.5 rounded-xl transition border border-slate-200 flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
        >
          <svg className="w-4 h-4 text-[#C09440]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Generar Folio de Trámite
        </button>
      </div>
 
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
        
        {message && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-4 rounded-xl text-xs font-medium border flex items-start gap-2.5 ${message.includes('requerido') ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-emerald-50 text-emerald-800 border-emerald-200'}`}
          >
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{message}</span>
          </motion.div>
        )}
 
        {/* SECTION 1: METADATA */}
        <div className="bg-slate-50/55 rounded-2xl p-5 border border-slate-200/60">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">A. Datos Generales de Registro</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Ejercicio Fiscal</label>
              <select
                required
                value={ejercicio}
                onChange={(e) => setEjercicio(e.target.value)}
                className="w-full bg-white rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-900/10 focus:border-slate-900 cursor-pointer"
              >
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
              </select>
            </div>
 
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Folio de Control Interno</label>
              <input
                type="text"
                required
                placeholder="PUE-AD-2027-142"
                value={folio}
                onChange={(e) => setFolio(e.target.value)}
                className="w-full bg-white rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-800 font-mono tracking-wider focus:outline-none focus:ring-4 focus:ring-slate-900/10 focus:border-slate-900 placeholder-slate-300"
              />
            </div>
 
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Tipo de Documento / Manual</label>
              <select
                required
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full bg-white rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-900/10 focus:border-slate-900 cursor-pointer"
              >
                <option value="MANUAL DE ORGANIZACIÓN">MANUAL DE ORGANIZACIÓN (MOG)</option>
                <option value="MANUAL DE PROCEDIMIENTOS">MANUAL DE PROCEDIMIENTOS (MAP)</option>
                <option value="MANUAL DE SERVICIOS AL PÚBLICO">MANUAL DE SERVICIOS AL PÚBLICO</option>
                <option value="REGLAMENTO INTERIOR">REGLAMENTO INTERIOR (RI)</option>
                <option value="ESTRUCTURA ORGÁNICA">ESTRUCTURA ORGÁNICA</option>
              </select>
            </div>
 
          </div>
        </div>
 
        {/* SECTION 2: THE 12 DIAGNOSTIC QUESTIONS */}
        <div className="space-y-8">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">B. Cuestiones Diagnósticas de Control</h3>
 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Q1 */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-800">
                1. ¿Quién es el enlace designado oficialmente para la elaboración de manuales en su dependencia?
              </label>
              <input
                type="text"
                required
                placeholder="Nombre, puesto y correo de contacto..."
                value={p1}
                onChange={(e) => setP1(e.target.value)}
                className="w-full bg-white rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-900/10 focus:border-slate-900"
              />
            </div>
 
            {/* Q2 */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-800">
                2. ¿Tiene dudas o inquietudes particulares sobre la metodología de la Dirección de Capital Humano?
              </label>
              <textarea
                rows={2}
                required
                placeholder="Describa si requiere asesoría o capacitación metodológica..."
                value={p2}
                onChange={(e) => setP2(e.target.value)}
                className="w-full bg-white rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-900/10 focus:border-slate-900"
              />
            </div>
 
            {/* Q3 */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-800">
                3. ¿Cuál es su principal obstáculo al redactar la redacción del objetivo y el alcance de un procedimiento?
              </label>
              <textarea
                rows={2}
                required
                placeholder="E.g., Alineación a metas, redacción de verbos en infinitivo, etc..."
                value={p3}
                onChange={(e) => setP3(e.target.value)}
                className="w-full bg-white rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-900/10 focus:border-slate-900"
              />
            </div>
 
            {/* Q4 */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-800">
                4. En el último periodo de observaciones de la DGCH, ¿cuántos días tardó aproximadamente en solventar?
              </label>
              <input
                type="text"
                required
                placeholder="E.g., 5 días hábiles, aún sin observaciones..."
                value={p4}
                onChange={(e) => setP4(e.target.value)}
                className="w-full bg-white rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-900/10 focus:border-slate-900"
              />
            </div>
 
            {/* Q6 */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-800">
                5. ¿Cuáles son las discrepancias actuales en la estructura de puestos (Validados vs Autorizados)?
              </label>
              <textarea
                rows={2}
                required
                placeholder="Reporte si cuenta con puestos transitorios sin validar..."
                value={p6}
                onChange={(e) => setP6(e.target.value)}
                className="w-full bg-white rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-900/10 focus:border-slate-900"
              />
            </div>
 
            {/* Q7 */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-800">
                6. ¿Con cuántos procedimientos vigentes cuenta su Dirección General que urjan actualización?
              </label>
              <input
                type="text"
                required
                placeholder="E.g., 12 procedimientos de los cuales 4 son críticos..."
                value={p7}
                onChange={(e) => setP7(e.target.value)}
                className="w-full bg-white rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-900/10 focus:border-slate-900"
              />
            </div>
 
            {/* Q8 */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-800">
                7. ¿Cuenta el área con Reglamento Interior debidamente publicado y vigente en el Periódico Oficial?
              </label>
              <select
                value={p8}
                onChange={(e) => setP8(e.target.value)}
                className="w-full bg-white rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-900/10 focus:border-slate-900 cursor-pointer"
              >
                <option value="Sí, actualizado y publicado en Periódico Oficial">Sí, actualizado y publicado en Periódico Oficial</option>
                <option value="Sí, pero requiere actualización estructural">Sí, pero requiere actualización estructural</option>
                <option value="No cuenta con reglamento / En borrador de firma">No cuenta con reglamento / En borrador de firma</option>
                <option value="En proceso de dictaminación jurídica">En proceso de dictaminación jurídica</option>
              </select>
            </div>
 
            {/* Q9 */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-800">
                8. Identifique los mayores 'cuellos de botella' en el proceso de revisión metodológica interna:
              </label>
              <textarea
                rows={2}
                required
                placeholder="Falta de firmas, cambios de titular, demoras metodológicas..."
                value={p9}
                onChange={(e) => setP9(e.target.value)}
                className="w-full bg-white rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-900/10 focus:border-slate-900"
              />
            </div>
 
            {/* Q10 */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-800">
                9. ¿El personal operativo a su cargo conoce plenamente la Visión y Misión institucional?
              </label>
              <input
                type="text"
                required
                placeholder="Porcentaje de conocimiento o estrategia de difusión..."
                value={p10}
                onChange={(e) => setP10(e.target.value)}
                className="w-full bg-white rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-900/10 focus:border-slate-900"
              />
            </div>
 
            {/* Q11 */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-800">
                10. ¿Cuál es la frecuencia común de revisión técnica de sus procesos de operación interna?
              </label>
              <select
                value={p11}
                onChange={(e) => setP11(e.target.value)}
                className="w-full bg-white rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-900/10 focus:border-slate-900 cursor-pointer"
              >
                <option value="Anual">Anual</option>
                <option value="Cada 2 años">Cada 2 años</option>
                <option value="Solo en cambio de administración pública">Solo en cambio de administración pública</option>
                <option value="Por contingencia u ordenación legal">Por contingencia u ordenación legal</option>
              </select>
            </div>
 
            {/* Q12 */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-800">
                11. ¿Qué porcentaje aproximado de los manuales del área se encuentran digitalizados y en intranet?
              </label>
              <select
                value={p12}
                onChange={(e) => setP12(e.target.value)}
                className="w-full bg-white rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-900/10 focus:border-slate-900 cursor-pointer"
              >
                <option value="Menos de 25%">Menos de 25% (Proceso inicial)</option>
                <option value="Entre 25% y 50%">Entre 25% y 50%</option>
                <option value="Entre 50% y 75%">Entre 50% y 75%</option>
                <option value="Más de 75%">Más de 75% (Óptimo digital)</option>
               </select>
            </div>
 
            {/* Q5 */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-800">
                12. ¿Cuáles son sus propuestas de mejora o comentarios adicionales para agilizar este proceso de control?
              </label>
              <textarea
                rows={2}
                placeholder="Anotaciones complementarias o propuestas técnicas..."
                value={p5}
                onChange={(e) => setP5(e.target.value)}
                className="w-full bg-white rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-900/10 focus:border-slate-900"
              />
            </div>
 
          </div>
        </div>
 
        {/* SUBMIT BUTTONS */}
        <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
          <button
            type="button"
            onClick={handleClear}
            className="px-5 py-2.5 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-bold text-xs cursor-pointer"
          >
            LIMPIAR BORRADOR
          </button>
          
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white rounded-xl font-bold text-sm tracking-wider shadow-sm hover:shadow-md transition-all duration-150 transform active:scale-95 cursor-pointer"
          >
            GUARDAR REGISTRO OFICIAL
          </button>
        </div>

      </form>
    </div>
  );
};
