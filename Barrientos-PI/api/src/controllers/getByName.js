const axios = require('axios');
const { API_KEY } = process.env;
const URL = 'https://api.rawg.io/api/games';

const getByName = async (req, res) => {
    const { name } = req.query;
    try {
        if (!name) {
            return res.status(400).json({ message: 'Por favor introduce un término de búsqueda válido' });
        }
        const { data } = await axios.get(`${URL}?search=${name}&key=7ef48bb5b05d4472b3fb6345a9456ed0`);
        const matchingGames = data.results.map((game) => {
            return {
                // id: game.id,
                name: game.name,
                image: game.background_image,
                rating: game.rating,
                releaseDate: game.released,
                    };
            }).slice(0,15);
        if(!matchingGames.length) return res.status(200).json({ message: "No hay juegos que coincidan con esta busqueda"})
        return res.status(200).json(matchingGames);
    } catch(error) {
        return res.status(500).send({ message: error.message });
    }
};

module.exports = getByName