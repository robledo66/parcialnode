// controllers/directoresController.js

import fs from 'fs';
import path from 'path';

const filePath = path.resolve('parcial1/data/directores.json');

// Función para leer el archivo JSON de directores
const readDirectoresFile = () => {
  
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

// Función para escribir en el archivo JSON de directores

// Obtener todos los directores
const obtenerDirectores = (req, res) => {
    const directores = readDirectoresFile();
    res.status(200).json(directores);
};

// Obtener un director por ID
const obtenerDirectorPorId = (req, res) => {
    const id = parseInt(req.params.id);
    const directores = readDirectoresFile();
    const director = directores.find(d => d.id === id);

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(404).json({ mensaje: 'Director no encontrado' });
    }
};

// Agregar un nuevo director
const agregarDirector = (req, res) => {
    const { nombre, nacionalidad, peliculasDirigidas } = req.body;
    const directores = readDirectoresFile();
    const nuevoDirector = {
        id: directores.length + 1,
        nombre,
        nacionalidad,
        peliculasDirigidas
    };
    directores.push(nuevoDirector);
    writeDirectoresFile(directores);
    res.status(201).json({ mensaje: 'Director agregado con éxito', director: nuevoDirector });
};

// Actualizar un director
const actualizarDirector = (req, res) => {
    const id = parseInt(req.params.id);
    const directores = readDirectoresFile();
    const director = directores.find(d => d.id === id);

    if (director) {
        const { nombre, nacionalidad, peliculasDirigidas } = req.body;
        if (nombre) director.nombre = nombre;
        if (nacionalidad) director.nacionalidad = nacionalidad;
        if (peliculasDirigidas) director.peliculasDirigidas = peliculasDirigidas;

        writeDirectoresFile(directores);
        res.status(200).json({ mensaje: 'Director actualizado con éxito', director });
    } else {
        res.status(404).json({ mensaje: 'Director no encontrado' });
    }
};

// Eliminar un director
const eliminarDirector = (req, res) => {
    const id = parseInt(req.params.id);
    const directores = readDirectoresFile();
    const indice = directores.findIndex(d => d.id === id);

    if (indice !== -1) {
        directores.splice(indice, 1);
        writeDirectoresFile(directores);
        res.status(204).send();
    } else {
        res.status(404).json({ mensaje: 'Director no encontrado' });
    }
};

// Exportación de las funciones
export { obtenerDirectores, obtenerDirectorPorId, agregarDirector, actualizarDirector, eliminarDirector };
