const axios = require('axios');
const { Videogame, Genre } = require('../db');

const getVideoGameById = async (id) => {
    const { API_KEY } = process.env;
    const URL = 'https://api.rawg.io/api/games';
    const uuidRegex = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}$/;
    const parsedId = parseInt(id)
    try {
        if (typeof id === 'string' && uuidRegex.test(id)) {
            const videoGame = await Videogame?.findByPk(id)
            const genres = await videoGame?.getGenres({
                attributes: ['name'],
                through: { attributes: [] }
              });
              
            videoGame.dataValues.genres = genres.map(genre => genre.name);
            return videoGame
        }
        if(typeof Number.isInteger(id) && id > 0) {
            const { data } = await axios.get(`${URL}/${id}?key=${API_KEY}`);
            const videoGame = {
                id: parsedId,
                name: data.name,
                rating: data.rating,
                image: data.background_image,
                genres: data.genres.map((genre) => genre.name),
                description: data.description,
                releaseDate: data.released,
                platforms: data.platforms.map((platform) => {
                    return platform.platform.name
                }),
            };
            return videoGame;
        }
    } catch(error) {
        throw error;
    }
};

module.exports = getVideoGameById