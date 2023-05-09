const axios = require('axios');
const { API_KEY } = process.env;
const URL = 'https://api.rawg.io/api/games'

const getVideoGameById = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id) {
            return res.status(400).send({ message: "No hay resultados para esta busqueda" });
        }
        const { data } = await axios.get(`${URL}/${id}?key=7ef48bb5b05d4472b3fb6345a9456ed0`);
        const videoGame = {
            name: data.name,
            rating: data.rating,
            description: data.description,
            releaseDate: data.released,
            platforms: data.platforms
        }
        return res.status(200).json(videoGame)
    } catch(error) {
        return res.status(500).send({ message: error.message });
    }
};

module.exports = getVideoGameById