import Pelicula from "../models/pelicula.js";

// Obtener todas las películas
export const obtenerPeliculas = async (req, res) => {
  try {
    const { genero, año, nombre, ordenarPor, orden, pagina = 1, limite = 10 } = req.query;
    let query = {};

    // Filtrado por género
    if (genero) {
      query.genero = genero;
    }

    // Filtrado por año
    if (año) {
      query.año = parseInt(año);
    }

    // Filtrado por nombre
    if (nombre) {
      query.titulo = { $regex: nombre, $options: "i" }; // Búsqueda insensible a mayúsculas
    }

    // Configuración del ordenamiento
    const sort = {};
    if (ordenarPor) {
      sort[ordenarPor] = orden === "desc" ? -1 : 1;
    }

    // Paginado
    const skip = (pagina - 1) * limite;
    const peliculas = await Pelicula.find(query).sort(sort).skip(skip).limit(parseInt(limite));

    // Total de documentos
    const total = await Pelicula.countDocuments(query);

    res.status(200).json({
      total,
      pagina: parseInt(pagina),
      limite: parseInt(limite),
      peliculas,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las películas", error });
  }
};

// Obtener una película por ID
export const obtenerPeliculaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const pelicula = await Pelicula.findById(id);
    if (!pelicula) {
      return res.status(404).json({ message: "Película no encontrada" });
    }
    res.status(200).json(pelicula);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la película", error });
  }
};

// Agregar una nueva película
export const agregarPelicula = async (req, res) => {
  try {
    const nuevaPelicula = new Pelicula(req.body);
    await nuevaPelicula.save();
    res.status(201).json({ message: "Película agregada con éxito", pelicula: nuevaPelicula });
  } catch (error) {
    res.status(400).json({ message: "Error al agregar la película", error });
  }
};

// Actualizar una película por su ID
export const actualizarPelicula = async (req, res) => {
  try {
    const { id } = req.params;
    const peliculaActualizada = await Pelicula.findByIdAndUpdate(id, req.body, {
      new: true, // Devuelve el documento actualizado
      runValidators: true, // Valida antes de actualizar
    });
    if (!peliculaActualizada) {
      return res.status(404).json({ message: "Película no encontrada" });
    }
    res.status(200).json(peliculaActualizada);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar la película", error });
  }
};

// Eliminar una película por ID
export const eliminarPelicula = async (req, res) => {
  try {
    const { id } = req.params;
    const peliculaEliminada = await Pelicula.findByIdAndDelete(id);
    if (!peliculaEliminada) {
      return res.status(404).json({ message: "Película no encontrada" });
    }
    res.status(200).json({ message: "Película eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la película", error });
  }
};
