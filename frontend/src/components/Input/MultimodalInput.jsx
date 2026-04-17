import { useState } from 'react';

const MultimodalInput = ({ onSendMessage }) => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text); // Envía el texto al "cerebro"
      setText('');
    }
  };

  return (
    <div className="w-full max-w-3xl px-4 pb-8">
      <form 
        onSubmit={handleSubmit}
        className="flex items-center gap-3 bg-slate-800/40 border border-slate-700/50 p-2 rounded-2xl backdrop-blur-md shadow-2xl"
      >
        {/* Botón de Micrófono (HU-0004: Voz) */}
        <button 
          type="button"
          onClick={() => setIsListening(!isListening)}
          className={`p-4 rounded-xl transition-all ${
            isListening 
              ? 'bg-red-500/20 text-red-500 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]' 
              : 'bg-slate-700/50 text-slate-400 hover:text-white'
          }`}
        >
          {isListening ? '🛑' : '🎤'}
        </button>
        
        {/* Entrada de Texto (HU-0004: Texto) */}
        <input 
          type="text" 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={isListening ? "Escuchando..." : "Escribe un comando para Salori-A..."}
          className="flex-1 bg-transparent border-none focus:ring-0 text-slate-200 placeholder-slate-500 py-3 px-2 text-lg"
        />

        <button 
          type="submit"
          className="p-4 bg-blue-600 hover:bg-blue-500 rounded-xl text-white transition-colors shadow-lg shadow-blue-900/20"
        >
          ➔
        </button>
      </form>
    </div>
  );
};

export default MultimodalInput;