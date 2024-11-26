// /models/pelicula.js
import mongoose from "mongoose";

const peliculaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  director: String,
  año: Number,
  genero: String,
});

// Verificar si el modelo ya está registrado para evitar errores
const Pelicula = mongoose.models.Pelicula || mongoose.model("Pelicula", peliculaSchema);

export default Pelicula;
