import mongoose from 'mongoose';

const directorSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    nacionalidad: { type: String, required: true },
    peliculasDirigidas: [String]
});

// Aquí se define el modelo basado en el esquema
const Director = mongoose.model('Director', directorSchema);

export default Director;
