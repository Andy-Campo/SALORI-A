import React, { useState, useEffect } from 'react';
// IMPORTANTE: El nombre debe ser NODES_CONFIG
import { NODES_CONFIG } from './constants'; 

const Connectivity = () => {
  const [status, setStatus] = useState({
    pc: true,
    cloud: false,
    mobile: false
  });

  // ... resto de tu lógica de useEffect ...

  return (
    <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 backdrop-blur-md">
      <h3 className="text-slate-400 text-xs font-bold mb-4 uppercase tracking-widest">
        Estado del Sistema
      </h3>
      <div className="flex flex-col gap-3">
        {NODES_CONFIG.map((node) => (
          <div key={node.id} className="flex items-center justify-between bg-slate-900/50 p-3 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-xl">{node.icon}</span>
              <span className="text-sm font-medium text-slate-200">{node.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold ${status[node.id] ? 'text-green-400' : 'text-red-400'}`}>
                {status[node.id] ? 'ON-LINE' : 'OFF-LINE'}
              </span>
              <div className={`w-2 h-2 rounded-full ${status[node.id] ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            </div>
          </div>
        ))}
      </div>
      {!status.cloud && (
        <div className="mt-4 p-2 bg-red-500/10 border border-red-500/50 rounded-md">
          <p className="text-red-400 text-[11px] text-center">
            ⚠️ Sincronización global desactivada
          </p>
        </div>
      )}
    </div>
  );
};

export default Connectivity;