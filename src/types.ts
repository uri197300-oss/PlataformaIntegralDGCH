export interface User {
  email: string;
  dependencia: string;
  role: 'admin' | 'user';
  loginTime: string;
  firstLogin?: string;
  lastLogin?: string;
}

export interface Solventacion {
  texto: string;
  fecha: string;
  usuario: string;
}

export interface Cuestionario {
  id: string;
  ejercicio: string;
  folio: string;
  tipo: string;
  usuario: string;
  dependencia: string;
  fecha: string;
  estado: string;
  
  // 12 Preguntas del cuestionario de control interno de manuales
  p1: string; // ¿Quién es el enlace designado para manuales en tu dependencia?
  p2: string; // ¿Tienes dudas sobre el proceso?
  p3: string; // Principal duda al redactar objetivo/alcance de un procedimiento
  p4: string; // Última vez que recibiste observaciones DGCH, ¿cuántos días tardaste en responder?
  p5: string; // Observaciones o dudas adicionales y propuestas de mejora
  p6: string; // Estructura actual de la dependencia (puestos validados vs autorizados)
  p7: string; // Número de procedimientos vigentes que requiere actualizar el área
  p8: string; // ¿Cuenta con reglamento interior actualizado y publicado en Periódico Oficial?
  p9: string; // Principales cuellos de botella identificados en la dictaminación de manuales
  p10: string; // ¿El personal conoce la misión y visión institucional de su área?
  p11: string; // ¿Cada cuánto tiempo se revisan y actualizan los manuales de procedimientos?
  p12: string; // ¿Qué porcentaje de manuales se encuentran totalmente digitalizados?

  solventacion?: Solventacion;
}

export interface FileItem {
  id: string;
  nombre: string;
  url: string;
  public_id?: string;
  usuario: string;
  dependencia: string;
  timestamp: any; // Firebase Timestamp or ISO
  size: number;
  tipo: string;
}
