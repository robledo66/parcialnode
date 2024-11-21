// /models/pelicula.js

import mongoose from 'mongoose';


const PeliculaSchema = new mongoose.Schema({
  titulo: String,
  director: String,
  año: Number,
});

const Pelicula = mongoose.model("Pelicula", PeliculaSchema);

export default Pelicula;
