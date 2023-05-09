const axios = require('axios');
const { API_KEY } = process.env;
const URL = 'https://api.rawg.io/api/games'

const getAllVideoGames = async (req, res) => {
    try {
        const { data } = await axios.get(`${URL}?key=7ef48bb5b05d4472b3fb6345a9456ed0`);
        // mapear los videogames, guardando los atributos del modelo videogame dentro
        // de un objeto y luego guardando ese objeto en la db

        const videoGame = data.results.map((game) => {
            return {
                // id: game.id,
                name: game.name,
                image: game.background_image,
                // platforms: game.platforms,
                rating: game.rating,
                releaseDate: game.released,
            }
        })
        return res.status(200).json(videoGame);
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

module.exports = getAllVideoGames;