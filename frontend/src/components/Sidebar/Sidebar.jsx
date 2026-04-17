import React, { useState } from 'react';

// Recibimos setActive y current desde App.jsx
const Sidebar = ({ setActive, current }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Inicio', icon: '🏠' }, // ID cambiado a dashboard para coincidir con App
    { id: 'notas', label: 'Notas', icon: '📝' },
    { id: 'finanzas', label: 'Finanzas', icon: '💰' },
    { id: 'calendario', label: 'Calendario', icon: '📅' },
    { id: 'ia-chat', label: 'IA Chat', icon: '🤖' },
  ];

  return (
    <nav className={`transition-all duration-500 ease-in-out bg-slate-800/40 border-r border-slate-700/50 flex flex-col ${isCollapsed ? 'w-20' : 'w-64'} h-full rounded-2xl`}>
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="p-4 text-slate-400 hover:text-white transition-colors self-end"
      >
        {isCollapsed ? '➡️' : '⬅️'}
      </button>

      <ul className="flex flex-col gap-2 p-2">
        {menuItems.map((item) => (
          <li key={item.id}>
            <button 
              onClick={() => setActive(item.id)} // <--- Aquí ocurre la magia
              className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${
                current === item.id 
                ? 'bg-blue-600/30 text-blue-400 border border-blue-500/50' 
                : 'hover:bg-slate-700/30 text-slate-400'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {!isCollapsed && (
                <span className="font-medium tracking-wide">
                  {item.label}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-auto p-4 border-t border-slate-700/30">
        {!isCollapsed && (
          <p className="text-[10px] text-slate-500 uppercase tracking-widest text-center">
            Salori-A v1.0
          </p>
        )}
      </div>
    </nav>
  );
};

export default Sidebar;