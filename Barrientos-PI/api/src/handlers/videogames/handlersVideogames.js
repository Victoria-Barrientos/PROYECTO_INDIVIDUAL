const { getAllVideoGames, getByName, getVideoGameById, postVideoGame, deleteVideoGame} = require('../../controllers/videogames');

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

const deleteVd = async (req, res) => {
    const { id } = req.params;
    try {
        if(!id) {
            return res.status(400).send({ message: "Please, provide a valid ID" });
        }
        await deleteVideoGame(id);
        res.status(204).send({ message: "Successfully deleted videogame"});
    } catch(error) {
        return res.status(500).send({ message: error.message });
    }
}

const postVd = async (req, res) => {
    const { name, description, platforms, releaseDate, image, rating, genres } = req.body;
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ message: 'This field cant be empty and must be a string' });
    }
    if (!description || typeof description !== 'string') {
        return res.status(400).json({ message: 'This field must be a string containing between 10 and 500 characters' });
    }
    if (!releaseDate || isNaN(Date.parse(releaseDate))) {
        return res.status(400).json({ message: 'Release date must be a valid date' });
    }
    if (!rating || typeof parseInt(rating) !== 'number' || rating < 0 || rating > 5) {
        return res.status(400).json({ message: 'Rating must be between 0 and 5' });
    }
    if (!image || typeof description !== 'string') {
        return res.status(400).json({ message: 'Image must be a string containing a URL to the image' });
    }
    if (!platforms || !Array.isArray(platforms)) {
        return res.status(400).json({ message: 'Platforms must be an array of strings' });
    }
    if (!genres || !Array.isArray(genres)) {
        return res.status(400).json({ message: 'Genres must be an array of strings' });
    }
    try {
        const videogame = await postVideoGame(name, description, platforms, releaseDate, image, rating, genres);
        return res.status(201).json({ videogame, message: 'Successfully created videogame!' });
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
    postVd,
    deleteVd
}