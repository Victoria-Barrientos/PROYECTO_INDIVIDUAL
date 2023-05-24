const axios = require('axios');
const { Videogame } = require('../db');
const { Op } = require('sequelize');

const getByName = async (name) => {
    const { API_KEY } = process.env;
    const URL = 'https://api.rawg.io/api/games';
    try {
        const { data } = await axios.get(`${URL}?search=${name}&key=${API_KEY}`);
        const matchingGames = data.results.map((game) => {
            return {
                id: game.id,
                name: game.name,
                image: game.background_image,
                rating: game.rating,
                releaseDate: game.released,
                genres: game.genres?.map((genre) => genre.name),
                };
            });
        
        const matchingGamesInDb = await Videogame.findAll({
            where: {
              name: {
                [Op.iLike]: `%${name}%`,
              },
            },
          });
        
        const allMatchingGames = [ ...matchingGamesInDb, ...matchingGames].slice(0,15);
        return allMatchingGames
    } catch(error) {
        throw error;
    }
};

module.exports = getByName