const { getAllVideoGames, getByName, getVideoGameById, postVideoGame} = require('../../controllers/videogames');

const getVideogames = async (req, res) => {
    try {
        const videogames = await getAllVideoGames()
        return res.status(200).json(videogames);
    } catch(error) {
        if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
            return res.status(500).send({ message: 'Network error occurred' });
        };
        if (error.response && error.response.status === 401) {
            return res.status(401).send({ message: 'Unauthorized' });
        };
        return res.status(500).send({ message: error.message });
    }
};

const getVdByName = async (req, res) => {
    try {
        if (!req.query.name) {
            return res.status(400).json({ message: 'Por favor introduce un término de búsqueda válido' });
        }
        const videogames = await getByName(req.query.name);
        if(!videogames.length) return res.status(200).json({ message: "No hay juegos que coincidan con esta busqueda"})
        return res.status(200).json(videogames);
    } catch(error) {
        return res.status(500).send({ message: error.message });
    }
};

const getVdById = async (req, res) => {
    const { id } = req.params;
    try {
        if(!id) {
            return res.status(400).send({ message: "No hay resultados para esta busqueda" });
        }
        const videogame = await getVideoGameById(id);
        return res.status(200).json(videogame);
    } catch(error) {
        return res.status(500).send({ message: error.message });
    }
};

const postVd = async (req, res) => {
    const { name, description, platforms, releaseDate, image, rating, genres } = req.body;
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ message: 'El nombre es obligatorio y debe ser una cadena de caracteres' });
    }
    if (!description || typeof description !== 'string') {
        return res.status(400).json({ message: 'La descripción es obligatoria y debe ser una cadena de caracteres' });
    }
    if (!releaseDate || isNaN(Date.parse(releaseDate))) {
        return res.status(400).json({ message: 'La fecha de lanzamiento es obligatoria y debe ser una fecha válida en formato de cadena' });
    }
    if (!rating || typeof rating !== 'number' || rating < 0 || rating > 5) {
        return res.status(400).json({ message: 'La calificación es obligatoria y debe ser un número entre 0 y 5' });
    }
    try {
        const videogame = await postVideoGame(name, description, platforms, releaseDate, image, rating, genres);
        console.log(videogame)
        return res.status(201).json({ videogame, message: 'Videojuego creado correctamente' });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: error.errors[0].message });
          } else {
            return res.status(500).send({ message: error.message });
          }
    }
};
 

module.exports = {
    getVideogames,
    getVdByName,
    getVdById,
    postVd
}
