const axios = require('axios');
const { Videogame, Genre } = require('../db');
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
            include: [{
              model: Genre,
              attributes: ['name'],
              through: { attributes: [] },
            }],
          });

        const matchingGamesWithGenres = matchingGamesInDb.map((videoGame) => {
          const genres = videoGame.genres.map((genre) => genre.name);
          return { ...videoGame.toJSON(), genres: genres };
        });
        
        const allMatchingGames = [ ...matchingGamesWithGenres, ...matchingGames].slice(0,15);
        return allMatchingGames
    } catch(error) {
        throw error;
    }
};

module.exports = getByName