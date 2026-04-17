import React from 'react';
import { STATUS_CONFIG } from './constants';

const Saloria = ({ status = 'idle' }) => {
  // Obtenemos la configuración según el estado recibido 
  const current = STATUS_CONFIG[status] || STATUS_CONFIG.idle;

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      
      {/* Contenedor del Avatar - Identidad Visual  */}
      <div className={`relative w-64 h-64 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${current.color} shadow-2xl bg-slate-800/50`}>
        
        {/* Capa de animación para mitigar pesadez de modelos 3D  */}
        <div className={`absolute inset-0 rounded-full border-2 opacity-30 ${current.animation} ${current.color}`}></div>
        
        {/* Nombre del sistema (Branding) */}
        <div className="text-center z-10">
          <span className="text-4xl font-black text-white tracking-tighter">
            SALORI<span className="text-blue-400">-A</span>
          </span>
        </div>
      </div>

      {/* Etiquetas de Estado - Criterios de Aceptación  */}
      <div className="text-center">
        <h2 className={`text-2xl font-bold tracking-widest transition-colors duration-500 ${current.color}`}>
          {current.label}
        </h2>
        <p className="text-gray-400 mt-2 italic font-light">
          {current.subtext}
        </p>
      </div>
    </div>
  );
};

export default Saloria;