import { useState, useEffect } from 'react'; // <--- IMPORTACIÓN CORREGIDA
import Saloria from './components/Avatar/Saloria.jsx';
import Connectivity from './components/Avatar/Connectivity.jsx'; 
import Sidebar from './components/Sidebar/Sidebar.jsx';
import MultimodalInput from './components/Input/MultimodalInput';

function App() {
  // --- ESTADOS ---
  const [currentStatus, setCurrentStatus] = useState('idle');
  const [activeModule, setActiveModule] = useState('dashboard');
  
  // HU-0007: Memoria de Sesión
  const [chatHistory, setChatHistory] = useState(() => {
    const saved = localStorage.getItem('saloria_history');
    return saved ? JSON.parse(saved) : [];
  });

  // --- EFECTOS ---
  // Guardar historial automáticamente
  useEffect(() => {
    localStorage.setItem('saloria_history', JSON.stringify(chatHistory));
  }, [chatHistory]);

  // --- LÓGICA DE COMANDOS (HU-0005) ---
  const handleCommand = async (message) => {
    if (!message.trim()) return;

    // Actualizar historial localmente
    const userMsg = { role: 'user', text: message, time: new Date().toLocaleTimeString() };
    setChatHistory(prev => [...prev, userMsg]);
    
    setCurrentStatus('processing'); 

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      if (!response.ok) throw new Error('Servidor offline');

      const data = await response.json();
      
      const aiMsg = { role: 'assistant', text: data.reply, time: new Date().toLocaleTimeString() };
      setChatHistory(prev => [...prev, aiMsg]);
      
      setCurrentStatus('executing');
      setTimeout(() => setCurrentStatus('idle'), 2000);

    } catch (error) {
      console.error("Fallo de conexión:", error);
      setCurrentStatus('idle');
    }
  };

  // --- VISTAS (DASHBOARD) ---
  const renderDashboard = () => (
    <div className="flex-1 flex flex-col items-center justify-between w-full">
      <div className="h-10" />
      <Saloria status={currentStatus} />
      <div className="w-full max-w-2xl flex flex-col items-center gap-4">
        <MultimodalInput onSendMessage={handleCommand} />
        <p className="text-slate-600 text-[9px] tracking-[0.4em] uppercase font-bold">
          Nexus AI Protocol • Localhost Connected
        </p>
      </div>
    </div>
  );

  // --- RENDERIZADO PRINCIPAL ---
  return (
    <div className="h-screen w-full bg-[#0a0b10] text-white flex p-6 gap-6 font-sans overflow-hidden">
      
      {/* HU-0003: Sidebar interactivo */}
      <Sidebar setActive={setActiveModule} current={activeModule} />
      
      {/* Panel lateral de información */}
      <aside className="w-80 flex flex-col gap-6">
        <Connectivity />
        <div className="flex-1 bg-slate-900/60 border border-slate-700/30 rounded-2xl p-4 overflow-y-auto">
          <h4 className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-4">Registro de Sesión</h4>
          <div className="space-y-3">
            {chatHistory.map((msg, i) => (
              <div key={i} className={`text-[11px] p-2 rounded-lg ${msg.role === 'user' ? 'bg-slate-800/40' : 'bg-blue-500/10 border-l-2 border-blue-500'}`}>
                <span className="opacity-40 text-[9px] block mb-1">{msg.time}</span>
                {msg.text}
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Área Central */}
      <main className="flex-1 flex flex-col relative bg-slate-900/40 rounded-[2.5rem] border border-white/5 p-8 shadow-2xl backdrop-blur-xl">
        {activeModule === 'dashboard' ? (
          renderDashboard()
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <h2 className="text-slate-500 text-sm tracking-[0.5em] uppercase animate-pulse">
              Módulo {activeModule} en línea
            </h2>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;