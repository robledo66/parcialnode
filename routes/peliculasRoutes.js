// routes/peliculasRoutes.js
import express from 'express';
import {
    obtenerPeliculas,
    obtenerPeliculaPorId,
    agregarPelicula,
    actualizarPelicula,
    eliminarPelicula
} from '../controllers/peliculasController.js';

const router = express.Router();

// Definir rutas para las operaciones de películas
router.get('/', obtenerPeliculas);
router.get('/:id', obtenerPeliculaPorId);
router.post('/', agregarPelicula);
router.put('/:id', actualizarPelicula);
router.delete('/:id', eliminarPelicula);

export default router;
