import { useState, useEffect } from 'react';
import { User, Cuestionario, FileItem } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Login } from './components/Login';
import { Responder } from './components/Responder';
import { Analytics } from './components/Analytics';
import { Solventaciones } from './components/Solventaciones';
import { Archivos } from './components/Archivos';
import { Usuarios } from './components/Usuarios';
import { Configuracion } from './components/Configuracion';
import { HtmlPreview } from './components/HtmlPreview';
import { db, handleFirestoreError, OperationType } from './firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { motion } from 'motion/react';

const PRELOADED_CUESTIONARIOS: Cuestionario[] = [
  {
    id: 'setup-1',
    ejercicio: '2027',
    folio: 'PUE-SPF-2027-311',
    tipo: 'MANUAL DE ORGANIZACIÓN',
    usuario: 'comunicacion.adm@puebla.gob.mx',
    dependencia: 'Secretaría de Planeación y Finanzas',
    fecha: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    estado: 'Enviado',
    p1: 'Lic. Gerardo Rosas Cuevas (Subdirector de Estructuras)',
    p2: 'No, la guía metodológica de Capital Humano es bastante clara y contiene diagramas legibles.',
    p3: 'La fragmentación de puestos de confianza del régimen transitorio.',
    p4: '3 días hábiles',
    p5: 'Se sugiere crear un módulo para firmar con firma electrónica oficial del estado (FIEL).',
    p6: '25 puestos validados contra 22 autorizados en la nómina oficial.',
    p7: '3 procedimientos de Recaudación y 2 de Vigilancia de Obligaciones.',
    p8: 'Sí, actualizado y publicado en Periódico Oficial',
    p9: 'Demoras en la validación por parte del enlace de la Dirección Jurídica.',
    p10: 'Sí, se realiza una jornada anual de inducción institucional al personal de confianza.',
    p11: 'Anual',
    p12: 'Más de 75%',
    solventacion: {
      texto: 'Se ajustaron las fichas metodológicas conforme al reglamento de Finanzas publicado el 12 de Enero de 2026.',
      fecha: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
      usuario: 'uri197300@gmail.com'
    }
  },
  {
    id: 'setup-2',
    ejercicio: '2027',
    folio: 'PUE-Sg-2027-402',
    tipo: 'MANUAL DE PROCEDIMIENTOS',
    usuario: 'seguridad.adm@puebla.gob.mx',
    dependencia: 'Secretaría de Gobernación',
    fecha: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    estado: 'Enviado',
    p1: 'Mtra. Lucía Ortega Pérez (Jefa de Normatividad Interna)',
    p2: 'Sí, requerimos asesoría adicional sobre el llenado del diagrama de hilos para trámites con ciudadanos.',
    p3: 'Alinear los alcances a las últimas reformas de la Ley Orgánica del Poder Ejecutivo.',
    p4: '7 días hábiles',
    p5: 'Capacitación presencial en el auditorio de la Secretaría de Planeación.',
    p6: 'Toda la estructura operativa se encuentra validada bajo el tabulador vigente.',
    p7: '8 procedimientos de protección de derechos humanos y atención a colectivos.',
    p8: 'Sí, pero requiere actualización estructural',
    p9: 'Rotación de enlaces administrativos en las dependencias sectorizadas.',
    p10: 'El 80% lo conoce, está publicado en mamparas de las Oficinas Centrales.',
    p11: 'Cada 2 años',
    p12: 'Entre 50% y 75%'
  }
];

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'responder' | 'analytics' | 'solventaciones' | 'archivos' | 'usuarios' | 'configurar' | 'html_preview'>('responder');
  const [cuestionarios, setCuestionarios] = useState<Cuestionario[]>([]);
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [fileItems, setFileItems] = useState<FileItem[]>([]);

  // Load initial session and preloads
  useEffect(() => {
    const savedUser = localStorage.getItem('pueblaUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }

    // Load Cuestionarios
    const savedCuestionarios = localStorage.getItem('pueblaCuestionarios');
    if (savedCuestionarios) {
      setCuestionarios(JSON.parse(savedCuestionarios));
    } else {
      setCuestionarios(PRELOADED_CUESTIONARIOS);
      localStorage.setItem('pueblaCuestionarios', JSON.stringify(PRELOADED_CUESTIONARIOS));
    }

    // Load Usuarios log
    const savedUsuarios = localStorage.getItem('pueblaUsuarios');
    const initialUsersList = savedUsuarios ? JSON.parse(savedUsuarios) : [
      {
        email: 'uri197300@gmail.com',
        dependencia: 'Administración Central',
        role: 'admin',
        loginTime: new Date().toISOString(),
        firstLogin: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      },
      {
        email: 'comunicacion.adm@puebla.gob.mx',
        dependencia: 'Secretaría de Planeación y Finanzas',
        role: 'user',
        loginTime: new Date().toISOString(),
        firstLogin: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      }
    ];

    setUsuarios(initialUsersList);
    if (!savedUsuarios) {
      localStorage.setItem('pueblaUsuarios', JSON.stringify(initialUsersList));
    }
  }, []);

  // Handle active user files stream subscription
  useEffect(() => {
    if (!currentUser) {
      setFileItems([]);
      return;
    }

    const colRef = collection(db, 'archivos');
    let q = query(colRef, orderBy('timestamp', 'desc'));

    // If regular user, only render their own files
    if (currentUser.role !== 'admin') {
      q = query(colRef, where('usuario', '==', currentUser.email));
    }

    const unsub = onSnapshot(q, (snapshot) => {
      const items: FileItem[] = [];
      snapshot.forEach((doc) => {
        const d = doc.data();
        items.push({
          id: doc.id,
          nombre: d.nombre || '',
          url: d.url || '',
          public_id: d.public_id,
          usuario: d.usuario || '',
          dependencia: d.dependencia || '',
          timestamp: d.timestamp,
          size: d.size || 0,
          tipo: d.tipo || ''
        });
      });
      
      // Secondary client-side fallback sorting just in case timestamp hasn't synced on server
      items.sort((a, b) => {
        const timeA = a.timestamp?.seconds || 0;
        const timeB = b.timestamp?.seconds || 0;
        return timeB - timeA;
      });

      setFileItems(items);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'archivos');
    });

    return () => unsub();
  }, [currentUser]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('pueblaUser', JSON.stringify(user));

    // Log the user into the database audit log
    const updatedUserList = [...usuarios];
    const matchIndex = updatedUserList.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
    
    if (matchIndex === -1) {
      const newUser: User = {
        ...user,
        firstLogin: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      updatedUserList.push(newUser);
    } else {
      updatedUserList[matchIndex].lastLogin = new Date().toISOString();
    }

    setUsuarios(updatedUserList);
    localStorage.setItem('pueblaUsuarios', JSON.stringify(updatedUserList));
    setActiveTab('responder');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('pueblaUser');
    setActiveTab('responder');
  };

  const handleSaveCuestionario = (data: Omit<Cuestionario, 'id' | 'usuario' | 'dependencia' | 'fecha' | 'estado'>) => {
    if (!currentUser) return;

    const newCuestionario: Cuestionario = {
      ...data,
      id: Math.random().toString(36).substring(2, 9) + Date.now().toString(),
      usuario: currentUser.email,
      dependencia: currentUser.dependencia,
      fecha: new Date().toISOString(),
      estado: 'Enviado'
    };

    const newDataset = [newCuestionario, ...cuestionarios];
    setCuestionarios(newDataset);
    localStorage.setItem('pueblaCuestionarios', JSON.stringify(newDataset));
  };

  const handleSaveSolventacion = (id: string, text: string) => {
    if (!currentUser) return;

    const updatedDataset = cuestionarios.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          solventacion: {
            texto: text,
            fecha: new Date().toISOString(),
            usuario: currentUser.email
          }
        };
      }
      return item;
    });

    setCuestionarios(updatedDataset);
    localStorage.setItem('pueblaCuestionarios', JSON.stringify(updatedDataset));
  };

  const handleClearLocalData = () => {
    setCuestionarios([]);
    setUsuarios([]);
    localStorage.removeItem('pueblaCuestionarios');
    localStorage.removeItem('pueblaUsuarios');
    alert('Base jurídica local borrada exitosamente.');
  };

  // Nav items based on role
  const isAdmin = currentUser?.role === 'admin';

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 flex flex-col relative font-sans antialiased selection:bg-slate-900/10 selection:text-slate-800">
      
      {!currentUser ? (
        <Login onLoginSuccess={handleLogin} />
      ) : (
        <>
          {/* Institutional Header */}
          <Header user={currentUser} onLogout={handleLogout} />
 
          {/* Tab Sub-Header Navigation bar */}
          <nav className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex gap-3 overflow-x-auto scrollbar-hide -mb-px">
                
                <button 
                  onClick={() => setActiveTab('responder')}
                  className={`whitespace-nowrap px-4 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 outline-none cursor-pointer ${activeTab === 'responder' ? 'border-[#C09440] text-slate-900 font-extrabold' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Responder</span>
                </button>
 
                <button 
                  onClick={() => setActiveTab('analytics')}
                  className={`whitespace-nowrap px-4 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 outline-none cursor-pointer ${activeTab === 'analytics' ? 'border-[#C09440] text-slate-900 font-extrabold' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Analytics</span>
                </button>
 
                <button 
                  onClick={() => setActiveTab('solventaciones')}
                  className={`whitespace-nowrap px-4 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 outline-none cursor-pointer ${activeTab === 'solventaciones' ? 'border-[#C09440] text-slate-900 font-extrabold' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Solventaciones</span>
                </button>
 
                <button 
                  onClick={() => setActiveTab('archivos')}
                  className={`whitespace-nowrap px-4 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 outline-none cursor-pointer ${activeTab === 'archivos' ? 'border-[#C09440] text-slate-900 font-extrabold' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Archivos</span>
                </button>
 
                {isAdmin && (
                  <button 
                    onClick={() => setActiveTab('usuarios')}
                    className={`whitespace-nowrap px-4 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 outline-none cursor-pointer ${activeTab === 'usuarios' ? 'border-[#C09440] text-slate-900 font-extrabold' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
                  >
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span>Usuarios</span>
                  </button>
                )}
 
                {isAdmin && (
                  <button 
                    onClick={() => setActiveTab('configurar')}
                    className={`whitespace-nowrap px-4 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 outline-none cursor-pointer ${activeTab === 'configurar' ? 'border-[#C09440] text-slate-900 font-extrabold' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
                  >
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    </svg>
                    <span>Configurar</span>
                  </button>
                )}

                <button 
                  onClick={() => setActiveTab('html_preview')}
                  className={`whitespace-nowrap px-4 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 outline-none cursor-pointer ${activeTab === 'html_preview' ? 'border-[#C09440] text-slate-900 font-extrabold' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
                >
                  <svg className="w-4 h-4 shrink-0 text-[#C09440]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <span>Código HTML</span>
                </button>
 
              </div>
            </div>
          </nav>

          {/* Main Workspace Frame container */}
          <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {activeTab === 'responder' && (
                <Responder user={currentUser} onSaveCuestionario={handleSaveCuestionario} />
              )}
              {activeTab === 'analytics' && (
                <Analytics cuestionarios={cuestionarios} user={currentUser} />
              )}
              {activeTab === 'solventaciones' && (
                <Solventaciones 
                  cuestionarios={cuestionarios} 
                  user={currentUser} 
                  onSaveSolventacion={handleSaveSolventacion} 
                />
              )}
              {activeTab === 'archivos' && (
                <Archivos files={fileItems} user={currentUser} />
              )}
              {activeTab === 'usuarios' && isAdmin && (
                <Usuarios usuarios={usuarios} />
              )}
              {activeTab === 'configurar' && isAdmin && (
                <Configuracion 
                  cuestionarios={cuestionarios} 
                  usuarios={usuarios} 
                  onClearLocalData={handleClearLocalData} 
                />
              )}
              {activeTab === 'html_preview' && (
                <HtmlPreview />
              )}
            </motion.div>
          </main>

          {/* Institutional Footer */}
          <Footer />
        </>
      )}

    </div>
  );
}
