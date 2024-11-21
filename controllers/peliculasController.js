// controllers/peliculasController.js

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Ruta al archivo JSON de películas
const filePath = path.resolve('parcial1/data/peliculas.json');

// Función para leer las películas desde el archivo JSON
const readPeliculasfile = () => {
   
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

// Obtener todas las películas
const obtenerPeliculas = (req, res) => {
    const { genero, año, nombre, ordenarPor, orden, pagina = 1, limite = 10 } = req.query;
    let peliculas = readPeliculasfile(); // Leer las películas del archivo

    // Filtrado por género
    if (genero) {
        peliculas = peliculas.filter(pelicula => pelicula.genero.toLowerCase() === genero.toLowerCase());
    }
      
    // Filtrado por año
    if (año) {
        peliculas = peliculas.filter(pelicula => pelicula.año === parseInt(año));
    }
    if (nombre) {
        peliculas = peliculas.filter(pelicula => 
            pelicula.titulo.toLowerCase().includes(nombre.toLowerCase())
        );
    }
   // Ordenamiento
if (ordenarPor) {
    peliculas.sort((a, b) => {
        let valA = a[ordenarPor];
        let valB = b[ordenarPor];

        // Convertir a string para comparación, pero solo si son números
        if (typeof valA === 'number') {
            valA = valA.toString();
        }
        if (typeof valB === 'number') {
            valB = valB.toString();
        }

        if (orden === 'asc') {
            return valA < valB ? -1 : valA > valB ? 1 : 0;
        } else { // 'desc'
            return valA > valB ? -1 : valA < valB ? 1 : 0;
        }
    });
}


    // Paginado
    const total = peliculas.length;
    const inicio = (pagina - 1) * limite;
    const paginadas = peliculas.slice(inicio, inicio + limite);

    res.status(200).json({
        total,
        pagina: parseInt(pagina),
        limite: parseInt(limite),
        peliculas: paginadas
    });
};

// Obtener una película por ID
const obtenerPeliculaPorId = (req, res) => {
    const id = parseInt(req.params.id);
    const peliculas = readPeliculasfile(); // Leer las películas del archivo
    const pelicula = peliculas.find(p => p.id === id);

    if (pelicula) {
        res.status(200).json(pelicula);
    } else {
        res.status(404).json({ mensaje: 'Película no encontrada' });
    }
};

// Agregar una nueva película
const agregarPelicula = (req, res) => {
    const { titulo, director, año, genero } = req.body;
    const peliculas = readPeliculasfile(); // Leer las películas del archivo
    const nuevaPelicula = {
        id: peliculas.length + 1,
        titulo,
        director,
        año,
        genero
    };
    peliculas.push(nuevaPelicula);
    
    // Guardar el nuevo array de películas en el archivo JSON
    fs.writeFileSync(filePath, JSON.stringify(peliculas, null, 2));

    res.status(201).json({ mensaje: 'Película agregada con éxito', pelicula: nuevaPelicula });
};

// Actualizar una película por su ID
const actualizarPelicula = (req, res) => {
    const id = parseInt(req.params.id);
    const peliculas = readPeliculasfile(); // Leer las películas del archivo
    const pelicula = peliculas.find(p => p.id === id);

    if (pelicula) {
        const { titulo, director, año, genero } = req.body;

        if (titulo) pelicula.titulo = titulo;
        if (director) pelicula.director = director;
        if (año) pelicula.año = año;
        if (genero) pelicula.genero = genero;

        // Guardar el array actualizado de películas en el archivo JSON
        fs.writeFileSync(filePath, JSON.stringify(peliculas, null, 2));

        res.status(200).json({ mensaje: 'Película actualizada con éxito', pelicula });
    } else {
        res.status(404).json({ mensaje: 'Película no encontrada' });
    }
};

// Eliminar una película por su ID
const eliminarPelicula = (req, res) => {
    const id = parseInt(req.params.id);
    let peliculas = readPeliculasfile(); // Leer las películas del archivo
    const index = peliculas.findIndex(p => p.id === id);

    if (index !== -1) {
        peliculas.splice(index, 1);
        // Guardar el array actualizado de películas en el archivo JSON
        fs.writeFileSync(filePath, JSON.stringify(peliculas, null, 2));
        res.status(204).send();
    } else {
        res.status(404).json({ mensaje: 'Película no encontrada' });
    }
};

// Exportación de las funciones individualmente
export { obtenerPeliculas, obtenerPeliculaPorId, agregarPelicula, actualizarPelicula, eliminarPelicula };
