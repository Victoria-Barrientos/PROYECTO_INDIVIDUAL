const axios = require('axios');
const { Videogame } = require('../db')

const getAllVideoGames = async () => {
    const { API_KEY } = process.env;
    const URL = 'https://api.rawg.io/api/games';
    try {
        const { data } = await axios.get(`${URL}?key=${API_KEY}`);
        const videoGames = data.results.map((game) => {
            return {
                id: game.id,
                name: game.name,
                image: game.background_image,
                platforms: game.platforms,
                rating: game.rating,
                releaseDate: game.released,
                genre: game.genres
            }
        })
        const videoGamesInDb = await Videogame.findAll();
        const allVideoGames = [...videoGames, ...videoGamesInDb];
        return allVideoGames
    } catch(error) {
        throw error
    }
};

module.exports = getAllVideoGames