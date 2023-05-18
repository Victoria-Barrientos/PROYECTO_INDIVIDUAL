const axios = require('axios');
const { Videogame, Genre } = require('../db')

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
                platforms: game.platforms?.map((platform) => {
                    return (platform.platform.name)
                }),
                rating: game.rating,
                releaseDate: game.released,
                genres: game.genres?.map((genre) => genre.name)
            }
        })
        const videoGamesInDb = await Videogame.findAll({
          include: [{
            model: Genre,
            attributes: ['name'],
            through: { attributes: [] }
          }]
        });
        const videoGamesWithGenres = videoGamesInDb.map(videoGame => {
          const genres = videoGame.genres.map(genre => genre.name); 
          return { ...videoGame.toJSON(), genres: genres }; 
        });
   
        const allVideoGames = [...videoGames, ...videoGamesWithGenres];
        return allVideoGames
    } catch(error) {
        throw error
    }
};

module.exports = getAllVideoGames