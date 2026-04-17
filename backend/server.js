const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors()); // Permite comunicación entre puerto 5173 y 5000
app.use(express.json());

// Endpoint Principal de la HU-0005
app.post('/api/chat', (req, res) => {
  const { message, history } = req.body;

  console.log(`[MEMORIA] Mensajes previos en sesión: ${history.length}`);
  
  console.log(`[SALORI-A LOG]: Nuevo mensaje -> ${message}`);

  if (!message) {
    return res.status(400).json({ status: 'error', message: 'Mensaje vacío' });
  }

  // Simulamos un retraso de procesamiento para que se vea la animación en el frontend
  setTimeout(() => {
    res.json({
      status: 'success',
      reply: `Comando "${message}" procesado correctamente en el núcleo.`,
      timestamp: new Date().toISOString()
    });
  }, 1500);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor NEXUS ejecutándose en http://localhost:${PORT}`);
});