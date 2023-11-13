const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de MongoDB
mongoose.connect('mongodb+srv://Coreju:Coreju2023@corejucluster.wjl4yiy.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Definición del esquema de MongoDB
const participantSchema = new mongoose.Schema({
  fullName: String,
  location: String,
  roomNumber: String,
  phoneNumber: String,
  email: String
});

const Participant = mongoose.model('Participant', participantSchema);

// Configuración de Express
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Rutas
app.post('/api/participants', async (req, res) => {
  try {
    const newParticipant = new Participant(req.body);
    await newParticipant.save();
    res.json({ message: 'Participante registrado exitosamente.' });
  } catch (error) {
    console.error('Error al registrar participante:', error);
    res.status(500).json({ message: 'Error al registrar participante.' });
  }
});

app.get('/api/participants', async (req, res) => {
  try {
    const participants = await Participant.find();
    res.json(participants);
  } catch (error) {
    console.error('Error al obtener participantes:', error);
    res.status(500).json({ message: 'Error al obtener participantes.' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
