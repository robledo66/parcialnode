import Director from '../models/director.js'; // Asegúrate de que el modelo esté en la ruta correcta
import mongoose from 'mongoose';
// Obtener todos los directores
const obtenerDirectores = async (req, res) => {
    try {
        const directores = await Director.find(); // Usamos Mongoose para obtener todos los directores
        res.status(200).json(directores);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los directores', error });
    }
};

// Obtener un director por ID
const obtenerDirectorPorId = async (req, res) => {
    const { id } = req.params;

    // Verificar si el id es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ mensaje: 'ID inválido' });
    }

    try {
        const director = await Director.findById(id);  // Buscar el director por ID
        if (director) {
            res.status(200).json(director);
        } else {
            res.status(404).json({ mensaje: 'Director no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el director', error });
    }
};

// Agregar un nuevo director
const agregarDirector = async (req, res) => {
    const { nombre, nacionalidad, peliculasDirigidas } = req.body;
    try {
        const nuevoDirector = new Director({
            nombre,
            nacionalidad,
            peliculasDirigidas
        });
        await nuevoDirector.save(); // Guardamos el nuevo director en la base de datos
        res.status(201).json({ mensaje: 'Director agregado con éxito', director: nuevoDirector });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al agregar el director', error });
    }
};

// Actualizar un director
const actualizarDirector = async (req, res) => {
    const { id } = req.params;
    const { nombre, nacionalidad, peliculasDirigidas } = req.body;
    try {
        const director = await Director.findById(id); // Buscamos el director por ID
        if (director) {
            if (nombre) director.nombre = nombre;
            if (nacionalidad) director.nacionalidad = nacionalidad;
            if (peliculasDirigidas) director.peliculasDirigidas = peliculasDirigidas;

            await director.save(); // Guardamos los cambios en la base de datos
            res.status(200).json({ mensaje: 'Director actualizado con éxito', director });
        } else {
            res.status(404).json({ mensaje: 'Director no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el director', error });
    }
};

// Eliminar un director
const eliminarDirector = async (req, res) => {
    const { id } = req.params;

    // Verificar si el ID es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ mensaje: 'ID inválido' });
    }

    try {
        const director = await Director.findByIdAndDelete(id); // Eliminar el director por ID
        if (director) {
            res.status(204).send(); // El director fue encontrado y eliminado
        } else {
            res.status(404).json({ mensaje: 'Director no encontrado' }); // No se encontró el director
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el director', error });
    }
};



// Exportación de las funciones
export { obtenerDirectores, obtenerDirectorPorId, agregarDirector, actualizarDirector, eliminarDirector };
