import path from 'path';
import peliculasRoutes from './routes/peliculasRoutes.js';
import directoresRoutes from './routes/directoresRoutes.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import Pelicula from './models/pelicula.js'; 
import Director from './models/director.js'; 

dotenv.config();

const app = express();
const PORT = 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((err) => console.error("Error al conectar con MongoDB:", err));

// Middleware para manejar JSON
app.use(express.json());

// Servir archivos estáticos de la carpeta 'public'
app.use(express.static(path.join(process.cwd(), 'public')));

// Ruta principal - Sirve el archivo index.html cuando accedes a él
app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(),'parcial1', 'public', 'index.html'));
});

// Rutas de películas
app.use('/peliculas', peliculasRoutes);

// Rutas de directores
app.use('/directores', directoresRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
