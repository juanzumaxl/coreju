const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb+srv://Coreju:Coreju2023@corejucluster.wjl4yiy.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Definir el esquema del modelo
const participantSchema = new mongoose.Schema({
    fullName: String,
    location: String,
    roomNumber: String,
    phoneNumber: String,
    email: String
});

// Crear el modelo Participant
const Participant = mongoose.model('Participant', participantSchema);

// Configurar bodyParser para analizar el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint para obtener todos los participantes registrados
app.get('/api/participants', async (req, res) => {
    try {
        const participants = await Participant.find();
        res.json(participants);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener participantes' });
    }
});

// Endpoint para registrar un nuevo participante
app.post('/api/participants', async (req, res) => {
    const { fullName, location, roomNumber, phoneNumber, email } = req.body;

    try {
        const newParticipant = new Participant({ fullName, location, roomNumber, phoneNumber, email });
        await newParticipant.save();
        res.json({ message: 'Participante registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar participante' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
