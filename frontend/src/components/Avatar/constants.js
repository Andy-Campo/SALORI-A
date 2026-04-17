// src/components/Saloria/constants.js
export const NODES_CONFIG = [
  { id: 'pc', label: 'PC Local', icon: '💻' },
  { id: 'cloud', label: 'Nube', icon: '☁️' },
  { id: 'mobile', label: 'Móvil', icon: '📱' }
];

export const STATUS_CONFIG = {
  idle: {
    color: 'border-green-500 shadow-green-500/50 text-green-500',
    label: 'ESPERA',
    animation: 'animate-pulse',
    subtext: 'Salori-A está lista'
  },
  processing: {
    color: 'border-blue-500 shadow-blue-500/50 text-blue-500',
    label: 'PROCESANDO',
    animation: 'animate-spin-slow',
    subtext: 'Interpretando comando...'
  },
  executing: {
    color: 'border-orange-500 shadow-orange-500/50 text-orange-500',
    label: 'EJECUTANDO',
    animation: 'animate-ping-slow',
    subtext: 'Acción en progreso'
  }
};