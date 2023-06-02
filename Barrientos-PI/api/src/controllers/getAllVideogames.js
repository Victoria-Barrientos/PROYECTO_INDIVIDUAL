const axios = require('axios');
const { Videogame, Genre } = require('../db');

const getAllVideoGames = async () => {
  const { API_KEY } = process.env;
  const URL = 'https://api.rawg.io/api/games';
  const videoGamesInApi = [];

  try {
    const requests = [];
    for (let i = 1; i <= 5; i++) {
      requests.push(axios.get(`${URL}?key=${API_KEY}&page=${i}`));
    }

    const responses = await Promise.all(requests);
    for (const response of responses) {
      const { results } = response.data;
      videoGamesInApi.push(...results);
    }

    const videoGames = videoGamesInApi.map((game) => {
      return {
        id: game.id,
        name: game.name,
        image: game.background_image,
        platforms: game.platforms?.map((platform) => platform.platform.name),
        rating: game.rating,
        releaseDate: game.released,
        genres: game.genres?.map((genre) => genre.name),
      };
    });

    // const savedVideoGames = await Videogame.bulkCreate(videoGames);

    // for (const videoGame of savedVideoGames) {
    //   const genreNames = await Genre.findAll({
    //     where: { name: videoGame.genres }
    //   });
    //   await videoGame.addGenre(genreNames);
    // }

    const videoGamesInDb = await Videogame.findAll({
      include: [{
        model: Genre,
        attributes: ['name'],
        through: { attributes: [] },
      }],
    });

    const videoGamesWithGenres = videoGamesInDb.map((videoGame) => {
      const genres = videoGame.genres.map((genre) => genre.name);
      return { ...videoGame.toJSON(), genres: genres };
    });

    const allVideoGames = [...videoGames, ...videoGamesWithGenres];
    return allVideoGames;
  } catch (error) {
    throw error;
  }
};

module.exports = getAllVideoGames;
