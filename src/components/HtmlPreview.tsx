import React, { useState } from 'react';

export const HtmlPreview: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'standalone' | 'index'>('standalone');

  const standaloneHtmlCode = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plataforma de Cuestionarios y Gestión de Manuales - Gobierno de Puebla</title>
    
    <!-- Google Fonts officail integration - Plus Jakarta Sans & JetBrains Mono -->
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
    
    <!-- Premium Tailwind CSS via official CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ["Plus Jakarta Sans", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
                        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"]
                    }
                }
            }
        }
    </script>
    
    <style>
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 45s linear infinite;
        }
        .animate-marquee:hover {
            animation-play-state: paused;
        }
        /* Custom premium scrollbar */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        ::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
        }
    </style>
</head>
<body class="bg-slate-50 text-slate-900 min-h-screen flex flex-col font-sans antialiased selection:bg-slate-900/10 selection:text-slate-800">

    <!-- TOP PREMIUM BAR -->
    <header class="bg-[#0f172a] text-white border-b border-slate-800 shadow-lg relative overflow-hidden">
        <div class="h-[4px] w-full bg-gradient-to-r from-red-700 via-[#C09440] to-slate-900"></div>
        
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="flex flex-col text-center md:text-left select-none">
                <span class="text-sm font-bold tracking-wider text-slate-100 uppercase">
                    Subsecretaría de Administración
                </span>
                <span class="text-xs text-[#C09440] font-semibold tracking-widest uppercase mt-1">
                    Dirección General de Capital Humano
                </span>
            </div>
            
            <div class="flex flex-wrap items-center justify-center gap-6">
                <!-- Puebla State Shield Shield -->
                <div class="flex items-center gap-2 border-r border-slate-800 pr-4 py-1 h-12">
                    <svg class="h-10 w-9 text-[#C09440]" viewBox="0 0 100 110" fill="currentColor">
                        <path d="M50 0 C40 10, 15 15, 15 45 C15 75, 35 95, 50 110 C65 95, 85 75, 85 45 C85 15, 60 10, 50 0 Z" fill="#C09440" />
                        <path d="M50 5 C43 14, 20 18, 20 45 C20 71, 37 89, 50 102 C63 89, 80 71, 80 45 C80 18, 57 14, 50 5 Z" fill="#0f172a" />
                        <path d="M50 15 L50 90 M25 45 L75 45 M30 30 L70 65" stroke="#C09440" strokeWidth="4" />
                        <circle cx="50" cy="45" r="8" fill="#ffffff" />
                    </svg>
                    <div class="flex flex-col text-slate-100">
                        <span class="text-[10px] font-black leading-none opacity-90">GOBIERNO DEL</span>
                        <span class="text-[14px] font-extrabold tracking-tight leading-none text-white">ESTADO</span>
                        <span class="text-[8px] font-bold tracking-widest text-[#C09440] mt-0.5 leading-none">2024 - 2030</span>
                    </div>
                </div>

                <div class="flex flex-col justify-center border-r border-slate-800 pr-4 h-12">
                    <span class="text-[16px] font-black text-white tracking-tight leading-none">
                        Finanzas
                    </span>
                    <span class="text-[8px] font-semibold text-slate-400 leading-tight max-w-[130px] mt-1">
                        Secretaría de Planeación, Finanzas y Administración
                    </span>
                </div>

                <div class="flex flex-col justify-center items-center border-r border-slate-800 pr-4 h-12">
                    <div class="text-[8px] font-extrabold tracking-widest text-[#C09440] uppercase leading-none">POR</div>
                    <div class="flex items-center gap-1">
                        <span class="text-[12px] font-black text-white uppercase tracking-tight">AMOR</span>
                        <span class="text-rose-500">❤️</span>
                        <span class="text-[12px] font-black text-white uppercase tracking-tight">A</span>
                    </div>
                    <div class="text-[13px] font-extrabold text-[#C09440] tracking-tighter leading-none -mt-0.5">PUEBLA</div>
                </div>
            </div>
        </div>
        
        <!-- Active User Status Bar -->
        <div class="bg-[#121c30] border-t border-slate-800/80 px-4 sm:px-6 lg:px-8 py-2.5">
            <div class="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
                <div class="flex items-center gap-2.5 text-slate-300">
                    <div class="relative flex h-2 w-2">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </div>
                    <span>Sesión activa: <strong class="text-emerald-300 font-medium">funcionario.puebla@puebla.gob.mx</strong></span>
                    <span class="text-slate-700">|</span>
                    <span class="uppercase text-[9px] font-extrabold px-2 py-0.5 bg-slate-800 text-slate-200 rounded border border-slate-700/60 tracking-wider">
                        Administración Central
                    </span>
                </div>
                <div class="text-slate-400 font-mono text-[11px]">
                    Oficialía Mayor de Estado
                </div>
            </div>
        </div>
    </header>

    <!-- MAIN INTERFACE PREVIEW -->
    <main class="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        
        <!-- INTRO HERO BLOCK -->
        <div class="mb-8 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <h1 class="text-xl font-extrabold text-slate-900 uppercase tracking-tight mb-2">Portal de Cumplimiento Técnico</h1>
            <p class="text-xs text-slate-500 leading-relaxed max-w-3xl">
                Bienvenido al visor de registros offline de los cuestionarios gubernamentales para la elaboración, dictaminación y vigencia de manuales oficiales de organización y procedimientos.
            </p>
        </div>

        <!-- TWO COLUMN LAYOUT -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <!-- Left Side / Responder Cuestionario mockup -->
            <div class="lg:col-span-2 space-y-6">
                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div class="bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                        <div>
                            <h2 class="text-sm font-bold text-slate-800 uppercase tracking-tight">Cuestionario de Control Interno</h2>
                            <p class="text-[10px] text-slate-500 font-semibold uppercase mt-0.5">Diagnóstico Técnico y Metodológico</p>
                        </div>
                        <span class="text-[10px] font-bold bg-[#C09440]/10 text-[#C09440] px-2.5 py-1 rounded-full border border-[#C09440]/20 uppercase">Ejemplo Oficial</span>
                    </div>

                    <div class="p-6 space-y-6">
                        <!-- Metadata Fields Grid -->
                        <div class="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 uppercase">Ejercicio Fiscal</label>
                                <span class="block text-xs font-semibold text-slate-800 mt-1">2026 / 2027</span>
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 uppercase">Folio Referencial</label>
                                <span class="block text-xs font-mono font-bold text-slate-900 mt-1">PUE-SPF-2027-311</span>
                            </div>
                        </div>

                        <!-- Questions Mockup -->
                        <div class="space-y-4">
                            <div class="p-3 bg-white border border-slate-200 rounded-xl">
                                <p class="text-xs font-bold text-slate-800">1. ¿Quién es el enlace designado oficialmente para la elaboración de manuales de organización?</p>
                                <p class="text-xs text-slate-600 mt-1 italic">R: Lic. Gerardo Rosas Cuevas (Subdirector de Estructuras)</p>
                            </div>
                            <div class="p-3 bg-white border border-slate-200 rounded-xl">
                                <p class="text-xs font-bold text-slate-800">2. ¿Con cuántos procedimientos vigentes cuenta su Dirección General que urjan actualización?</p>
                                <p class="text-xs text-slate-600 mt-1 italic">R: 3 procedimientos de recaudación y 2 de auditoría fiscal.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Column / Statistics Panel -->
            <div class="space-y-6">
                <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <h3 class="font-bold text-xs text-slate-500 uppercase tracking-widest mb-4">Métricas de Control Administrativo</h3>
                    
                    <div class="space-y-4">
                        <div class="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <div>
                                <span class="block text-[9px] font-bold text-slate-400 uppercase">Estatus Promedio</span>
                                <span class="block text-sm font-bold text-[#0f172a] mt-0.5">94.5% En Tiempo</span>
                            </div>
                            <span class="text-emerald-600 text-lg">⚡</span>
                        </div>
                        
                        <div class="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <div>
                                <span class="block text-[9px] font-bold text-slate-400 uppercase">Manuales MOG</span>
                                <span class="block text-sm font-bold text-slate-800 mt-0.5">18 Manuales Registrados</span>
                            </div>
                            <span class="text-blue-600 text-lg">📁</span>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

    </main>

    <!-- FOOTER -->
    <footer class="bg-slate-50 border-t border-slate-200 py-6 mt-12 w-full relative">
        <!-- Talavera watermark marquee -->
        <div class="w-full bg-slate-100/80 border-b border-t border-slate-200/50 py-1.5 mb-6 overflow-hidden flex items-center select-none">
            <div class="flex gap-2 items-center justify-center w-full animate-marquee">
                <!-- Watermark segments -->
                <span class="text-xs font-bold tracking-widest text-[#C09440] uppercase px-4">GOBIERNO DIGITAL PUEBLA</span>
                <span class="text-slate-350 shrink-0 opacity-40">❄️</span>
                <span class="text-xs font-bold tracking-widest text-slate-400 uppercase px-4">ADM - 2024-2030</span>
                <span class="text-slate-350 shrink-0 opacity-40">❄️</span>
                <span class="text-xs font-bold tracking-widest text-[#C09440] uppercase px-4">ESTACIÓN DE TRABAJO AUTORIZADA</span>
                <span class="text-slate-350 shrink-0 opacity-40">❄️</span>
                
                <span class="text-xs font-bold tracking-widest text-[#C09440] uppercase px-4">GOBIERNO DIGITAL PUEBLA</span>
                <span class="text-slate-350 shrink-0 opacity-40">❄️</span>
                <span class="text-xs font-bold tracking-widest text-slate-400 uppercase px-4">ADM - 2024-2030</span>
                <span class="text-slate-350 shrink-0 opacity-40">❄️</span>
                <span class="text-xs font-bold tracking-widest text-[#C09440] uppercase px-4">ESTACIÓN DE TRABAJO AUTORIZADA</span>
                <span class="text-slate-350 shrink-0 opacity-40">❄️</span>
            </div>
        </div>
        
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="flex items-center gap-4">
                <div class="flex items-center gap-2 border-r border-slate-200 pr-4">
                    <div class="flex flex-col text-[#475569]">
                        <span class="text-[9px] font-black leading-none opacity-80">GOBIERNO DEL</span>
                        <span class="text-xs font-black tracking-tight leading-none text-slate-800">ESTADO DE PUEBLA</span>
                        <span class="text-[8px] font-semibold tracking-widest text-[#C09440] mt-0.5 leading-none">2024 - 2030</span>
                    </div>
                </div>
                <div class="flex flex-col text-slate-500 text-[10px]">
                    <span class="font-bold text-slate-700">Subsecretaría de Administración</span>
                    <span>Dirección General de Capital Humano</span>
                </div>
            </div>
            
            <div class="text-center md:text-right text-xs text-slate-500 font-sans">
                <p class="font-semibold text-slate-700 uppercase tracking-wider text-[10px]">Sistema Certificado de Cuestionarios y Gestión</p>
                <p class="mt-1">© 2026 Gobierno del Estado de Puebla. Reservados todos los derechos oficiales.</p>
            </div>
        </div>
    </footer>

</body>
</html>`;

  const indexHtmlCode = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Plataforma de Cuestionarios y Gestión de Manuales - Gobierno de Puebla</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;

  const currentCode = activeSubTab === 'standalone' ? standaloneHtmlCode : indexHtmlCode;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadFile = () => {
    const blob = new Blob([currentCode], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeSubTab === 'standalone' ? 'Cuestionario_Puebla_Completo.html' : 'index.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden font-sans">
      
      {/* Ribbon Header */}
      <div className="bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 px-6 sm:px-8 py-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-800 tracking-tight uppercase">Visor e Integración del Código HTML</h2>
          <p className="text-[11px] text-slate-500 mt-0.5">Obtenga el código fuente completo e interactivo del portal para despliegue local o clonado inmediato</p>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setActiveSubTab('standalone')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${activeSubTab === 'standalone' ? 'bg-[#0f172a] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'} cursor-pointer`}
          >
            Standalone SPA
          </button>
          <button
            onClick={() => setActiveSubTab('index')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${activeSubTab === 'index' ? 'bg-[#0f172a] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'} cursor-pointer`}
          >
            index.html
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        
        {/* Info Box */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
          <span className="text-lg mt-0.5">📋</span>
          <div className="text-xs text-slate-600 leading-relaxed space-y-1">
            <p className="font-bold text-slate-800">Instrucciones de Uso de la Plantilla:</p>
            {activeSubTab === 'standalone' ? (
              <p>Este bloque representa el **HTML Completo Autónomo** del sistema. Integra el SDK de Tailwind CSS, fuentes tipográficas gubernamentales oficiales de Google y la estructura robusta del gobierno de Puebla. Puede guardarlo como un archivo `.html` e iniciarlo directamente de forma offline.</p>
            ) : (
              <p>Este bloque representa el archivo principal **index.html** de la compilación de producción del entorno Vite SPA para el despliegue de contenedores en la nube.</p>
            )}
          </div>
        </div>

        {/* Action Buttons Panel */}
        <div className="flex items-center justify-between gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
          <span className="text-[11px] font-mono font-bold text-slate-500 uppercase px-1">
            {activeSubTab === 'standalone' ? 'Standalone HTML (~12.5 KB)' : 'index.html (< 1 KB)'}
          </span>
          
          <div className="flex gap-2">
            <button
              onClick={handleDownloadFile}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-bold text-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
              Descargar Archivo
            </button>

            <button
              onClick={copyToClipboard}
              className={`px-5 py-2 ${copied ? 'bg-emerald-600 text-white' : 'bg-[#0f172a] hover:bg-[#1e293b] text-white'} rounded-xl font-bold text-xs shadow-sm transition flex items-center gap-1.5 cursor-pointer`}
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>¡Código Copiado!</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012-2" />
                  </svg>
                  <span>Copiar Código HTML</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Code Visualizer Panel */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
          <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800 text-slate-400 text-[10px] font-mono">
            <span>Visualizador de Código Fuente Orgánico</span>
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            </div>
          </div>
          
          <textarea
            readOnly
            value={currentCode}
            className="w-full h-96 bg-slate-950 text-slate-300 font-mono text-xs p-6 overflow-y-auto focus:outline-none select-all"
            style={{ resize: 'none' }}
          />
        </div>

      </div>
    </div>
  );
};
