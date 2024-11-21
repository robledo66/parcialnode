import express from 'express';
import { obtenerDirectores, obtenerDirectorPorId, agregarDirector, actualizarDirector, eliminarDirector } from '../controllers/directoresController.js';

const router = express.Router();

router.get('/', obtenerDirectores);
router.get('/:id', obtenerDirectorPorId);
router.post('/', agregarDirector);
router.put('/:id', actualizarDirector);
router.delete('/:id', eliminarDirector);

export default router;
