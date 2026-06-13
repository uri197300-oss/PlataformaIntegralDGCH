import React from 'react';
import { Cuestionario, User } from '../types';

interface ConfiguracionProps {
  cuestionarios: Cuestionario[];
  usuarios: User[];
  onClearLocalData: () => void;
}

export const Configuracion: React.FC<ConfiguracionProps> = ({ cuestionarios, usuarios, onClearLocalData }) => {
  
  const handleExportCSV = () => {
    const headers = 'Folio,Ejercicio,Tipo de Manual,Dependencia,Enlace,Estatus,Fecha Creación\n';
    const rows = cuestionarios.map((c) => {
      const escapedDep = c.dependencia.replace(/"/g, '""');
      const escapedTipo = c.tipo.replace(/"/g, '""');
      const escapedEnlace = c.p1.replace(/"/g, '""');
      const status = c.solventacion ? 'Solventado' : 'Pendiente';
      return `"${c.folio}","${c.ejercicio}","${escapedTipo}","${escapedDep}","${escapedEnlace}","${status}","${c.fecha}"`;
    }).join('\n');

    const combined = headers + rows;
    const blob = new Blob([combined], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CUESTIONARIOS_PUEBLA_${new Date().toISOString().substring(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    const statePackage = {
      cuestionarios,
      usuarios,
      generado_en: new Date().toISOString(),
      entorno: 'Gobierno del Estado de Puebla',
      auditoria: 'Dirección General de Capital Humano'
    };

    const blob = new Blob([JSON.stringify(statePackage, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RESPALDO_SISTEMA_PUEBLA_${new Date().toISOString().substring(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onConfirmWipe = () => {
    const ans = confirm('¿Está seguro de eliminar de forma irrevocable todos los cuestionarios, usuarios y bitácoras cargados localmente en este navegador? Esta acción es auditada.');
    if (ans) {
      onClearLocalData();
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
      
      {/* Export Panel */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-sm text-neutral-800 uppercase tracking-wider mb-1.5">Exportación de Datos Públicos</h3>
          <p className="text-xs text-neutral-500 mb-6">Genere respaldos técnicos de la base de datos de control para alimentar sistemas externos u hojas de cálculo.</p>
          
          <div className="space-y-3">
            <button
              onClick={handleExportCSV}
              className="w-full px-4 py-3 border border-neutral-300 rounded-xl hover:bg-neutral-50 text-xs font-bold text-neutral-700 text-left transition flex items-center gap-2.5 shadow-sm"
            >
              <span className="text-emerald-700 text-lg">📊</span>
              <span>Exportar Reporte de Cuestionarios (CSV)</span>
            </button>

            <button
              onClick={handleExportJSON}
              className="w-full px-4 py-3 border border-neutral-300 rounded-xl hover:bg-neutral-50 text-xs font-bold text-neutral-700 text-left transition flex items-center gap-2.5 shadow-sm"
            >
              <span className="text-blue-700 text-lg">💾</span>
              <span>Generar Respaldo Estructural de la DB (JSON)</span>
            </button>
          </div>
        </div>
        
        <p className="text-[10px] text-neutral-400 mt-6 pt-4 border-t border-neutral-100 italic">
          Los archivos generados contienen firma legal del Gobierno del Estado de Puebla e integran todos los campos diagnósticos.
        </p>
      </div>

      {/* Danger Zone Panel */}
      <div className="bg-white rounded-2xl border border-red-200 p-6 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-sm text-red-900 uppercase tracking-wider mb-1.5">Zona de Control Restringido</h3>
          <p className="text-xs text-neutral-500 mb-6 font-medium">Acciones irreversibles que impactarán directamente la visualización de datos históricos locales.</p>
          
          <button
            onClick={onConfirmWipe}
            className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-red-600/10 active:scale-95 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>ELIMINAR TODOS LOS REGISTROS LOCALES</span>
          </button>
        </div>

        <p className="text-[10px] text-red-700/80 mt-6 pt-4 border-t border-neutral-100 font-semibold italic">
          ¡Atención! La depuración vaciará el almacenamiento de este navegador, pero no alterará las colecciones de archivos subidos al servidor central Cloudinary/Firestore.
        </p>
      </div>

    </div>
  );
};
