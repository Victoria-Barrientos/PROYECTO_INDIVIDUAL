const {Genre, Videogame} = require('../db.js')

const postVideoGame = async (name, description, platforms, releaseDate, image, rating, genres) => {
    try {
        const newVideoGame = await Videogame.create({
            name,
            description,
            platforms,
            releaseDate,
            image,
            rating
        });
        const genreNames = await Genre.findAll({
            where: { name: genres }
        })
        await newVideoGame.addGenre(genreNames);
        return newVideoGame
    } catch(error) {
        throw error
    }
};

module.exports = postVideoGame
