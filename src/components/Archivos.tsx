import React, { useState } from 'react';
import { User, FileItem } from '../types';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion } from 'motion/react';

interface ArchivosProps {
  files: FileItem[];
  user: User;
}

const CLOUDINARY_CLOUD_NAME = "dt0kf2crx";
const CLOUDINARY_UPLOAD_PRESET = "archivos_unsig";

export const Archivos: React.FC<ArchivosProps> = ({ files, user }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadTasks, setUploadTasks] = useState<{ id: string; name: string; pct: number; status: 'uploading' | 'completed' | 'error' }[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const dm = 1;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setSuccessMessage('El enlace directo del archivo ha sido copiado.');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      Array.from(e.target.files).forEach(uploadFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      Array.from(e.dataTransfer.files).forEach(uploadFile);
    }
  };

  const uploadFile = async (file: File) => {
    setErrorMessage(null);
    if (file.size > 20 * 1024 * 1024) {
      setErrorMessage(`El archivo "${file.name}" supera el límite institucional de 20MB.`);
      return;
    }

    const taskId = Math.random().toString(36).substring(2, 9);
    
    // Add to local list of upload tasks
    setUploadTasks((prev) => [...prev, { id: taskId, name: file.name, pct: 0, status: 'uploading' }]);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', 'puebla_archivos');

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        setUploadTasks((prev) => 
          prev.map((t) => (t.id === taskId ? { ...t, pct: percent } : t))
        );
      }
    };

    xhr.onload = async () => {
      try {
        const responseJson = JSON.parse(xhr.responseText);
        if (xhr.status === 200) {
          // Success uploading to Cloudinary, now registers in Firestore 'archivos'
          try {
            await addDoc(collection(db, 'archivos'), {
              nombre: file.name,
              url: responseJson.secure_url,
              public_id: responseJson.public_id,
              usuario: user.email,
              dependencia: user.dependencia,
              timestamp: serverTimestamp(),
              size: file.size,
              tipo: file.type
            });

            setUploadTasks((prev) => 
              prev.map((t) => (t.id === taskId ? { ...t, status: 'completed', pct: 100 } : t))
            );

            // Toast feedback
            setSuccessMessage(`Archivo "${file.name}" guardado institucionalmente de forma exitosa.`);
            setTimeout(() => setSuccessMessage(null), 4000);
          } catch (fsErr) {
            handleFirestoreError(fsErr, OperationType.CREATE, 'archivos');
            throw fsErr;
          }
        } else {
          throw new Error(responseJson.error?.message || 'Fallo al procesar Cloudinary.');
        }
      } catch (err) {
        console.error('Upload Process Failed:', err);
        setUploadTasks((prev) => 
          prev.map((t) => (t.id === taskId ? { ...t, status: 'error' } : t))
        );
        setErrorMessage(`Fallo de guardado del archivo "${file.name}". Intente nuevamente.`);
      }
    };

    xhr.onerror = () => {
      setUploadTasks((prev) => 
        prev.map((t) => (t.id === taskId ? { ...t, status: 'error' } : t))
      );
      setErrorMessage('Error de red al establecer comunicación con el repositorio estatal.');
    };

    xhr.send(formData);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Messages */}
      {(errorMessage || successMessage) && (
        <div className="space-y-2">
          {errorMessage && (
            <div className="p-3.5 bg-red-50 border border-red-250 text-red-800 text-xs font-semibold rounded-xl flex items-start gap-2.5">
              <svg className="w-4 h-4 shrink-0 text-red-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}
          {successMessage && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-250 text-emerald-800 text-xs font-semibold rounded-xl flex items-start gap-2.5">
              <svg className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{successMessage}</span>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Upload Column */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 sticky top-24">
            <h3 className="font-bold text-sm text-neutral-800 uppercase tracking-wider mb-2">Subir Elementos</h3>
            <p className="text-xs text-neutral-500 mb-4">Adjunte los manuales, oficios de firma o metodologías en formatos oficiales.</p>
            
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-upload-input')?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center ${isDragging ? 'border-slate-800 bg-slate-50' : 'border-neutral-300 hover:border-slate-900 hover:bg-neutral-50'}`}
            >
              <input 
                type="file" 
                id="file-upload-input" 
                multiple 
                onChange={handleFileSelect} 
                className="hidden" 
              />
              
              <svg className="w-12 h-12 text-[#C09440] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>

              <p className="text-xs font-bold text-neutral-800 uppercase tracking-wider">Depositar Archivos</p>
              <p className="text-[10px] text-neutral-400 mt-1">Arrastre o haga clic para examinar</p>
              <p className="text-[9px] text-[#C09440] font-black uppercase mt-3">PDF, DOCX, XLSX, JPG o PNG hasta 20MB</p>
            </div>

            {/* Upload progress list */}
            {uploadTasks.length > 0 && (
              <div className="mt-5 space-y-3.5 border-t border-neutral-100 pt-4 max-h-48 overflow-y-auto">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Tareas Procesando</p>
                {uploadTasks.map((t) => (
                  <div key={t.id} className="bg-neutral-50 border border-neutral-200/50 rounded-xl p-3 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-medium text-neutral-700">
                      <span className="truncate max-w-[120px]" title={t.name}>{t.name}</span>
                      <span className={`font-bold ${t.status === 'error' ? 'text-red-700' : 'text-neutral-500'}`}>
                        {t.status === 'error' ? 'Fallo' : t.pct + '%'}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${t.status === 'error' ? 'bg-red-600' : t.status === 'completed' ? 'bg-emerald-600' : 'bg-slate-950'}`}
                        style={{ width: `${t.pct}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

        {/* Repository Browser Column */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-neutral-100">
              <h3 className="font-bold text-sm text-neutral-800 uppercase tracking-wider">Repositorio de Archivos</h3>
              <span className="text-[10px] font-bold bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-full uppercase border border-slate-200">
                {files.length} Documentos
              </span>
            </div>

            {files.length === 0 ? (
              <div className="text-center py-16 text-neutral-400 space-y-3 select-none">
                <svg className="w-14 h-14 mx-auto text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
                </svg>
                <div className="font-semibold text-neutral-500 text-sm">No se han cargado documentos en la adscripción</div>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto">Use el panel adjunto para cargar archivos que sirvan para acreditar la solventación de sus deudas.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {files.map((f) => {
                  const isPDF = f.tipo?.includes('pdf') || f.nombre?.endsWith('.pdf');
                  const isImg = f.tipo?.startsWith('image/');
                  const isXls = f.tipo?.includes('excel') || f.tipo?.includes('sheet') || f.nombre?.endsWith('.xlsx') || f.nombre?.endsWith('.xls');
                  
                  const iconSvg = isPDF ? (
                    <svg className="w-8 h-8 text-red-700" fill="currentColor" viewBox="0 0 24 24"><path d="M19,3H5C3.3,3,2,4.3,2,6v12c0,1.7,1.3,3,3,3h14c1.7,0,3-1.3,3-3V6C22,4.3,20.7,3,19,3z M11,10.5H9.5V13H11V10.5z M4,8h16v13H4V8z"/></svg>
                  ) : isXls ? (
                    <svg className="w-8 h-8 text-emerald-700" fill="currentColor" viewBox="0 0 24 24"><path d="M19,3H5C3.3,3,2,4.3,2,6v12c0,1.7,1.3,3,3,3h14c1.7,0,3-1.3,3-3V6C22,4.3,20.7,3,19,3z M11,10H9v4h2V10z M4,8h16v13H4V8z"/></svg>
                  ) : isImg ? (
                    <svg className="w-8 h-8 text-blue-700" fill="currentColor" viewBox="0 0 24 24"><path d="M8.5,13.5L11,16.5L14.5,12L19,18H5L8.5,13.5 M19,3H5C3.3,3,2,4.3,2,6v12c0,1.7,1.3,3,3,3h14c1.7,0,3-1.3,3-3V6C22,4.3,20.7,3,19,3z"/></svg>
                  ) : (
                    <svg className="w-8 h-8 text-stone-600" fill="currentColor" viewBox="0 0 24 24"><path d="M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8L14,2z M13,9V3.5L18.5,9H13z"/></svg>
                  );

                  // Process human readable date description
                  let dateStr = '—';
                  if (f.timestamp) {
                    const d = f.timestamp.toDate ? f.timestamp.toDate() : new Date(f.timestamp);
                    dateStr = d.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + d.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
                  }

                  return (
                    <div key={f.id} className="border border-neutral-200 rounded-xl p-4 flex flex-col justify-between hover:shadow-md hover:border-neutral-350 transition bg-neutral-50/25">
                      <div className="flex items-start gap-3">
                        <div className="shrink-0">{iconSvg}</div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-xs text-neutral-800 truncate" title={f.nombre}>{f.nombre}</p>
                          <p className="text-[10px] text-neutral-500 mt-0.5">{formatBytes(f.size)} • {dateStr}</p>
                          <span className="block mt-1 text-[9px] text-slate-800 font-extrabold uppercase truncate">{f.dependencia}</span>
                          <span className="block text-[9px] text-neutral-400 font-mono font-medium truncate">{f.usuario}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-4">
                        <a 
                          href={f.url} 
                          target="_blank" 
                          referrerPolicy="no-referrer"
                          className="flex-1 text-center py-1.5 bg-[#0f172a] hover:bg-[#1e293b] text-white rounded-lg text-[10px] font-bold shadow-sm transition"
                        >
                          VER ELEMENTO
                        </a>
                        <button
                          type="button"
                          onClick={() => handleCopy(f.url)}
                          className="px-2.5 py-1.5 text-stone-700 bg-white border border-neutral-300 rounded-lg text-[10px] font-bold hover:bg-neutral-100 transition shadow-sm"
                        >
                          ENLACE
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
