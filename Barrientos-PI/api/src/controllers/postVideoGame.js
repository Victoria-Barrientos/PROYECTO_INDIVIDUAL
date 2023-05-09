const {Genre, Videogame} = require('../db.js')

const postVideoGame = async (req, res) => {
    const { name, description, platforms, releaseDate, image, rating } = req.body;
    try {
        const newVideoGame = await Videogame.create({
            name,
            description,
            platforms,
            releaseDate,
            image,
            rating
        });
        // const genreNames = await Genre.findAll(

        // )
        // await newVideoGame.addGenre(genreNames)
    } catch(error) {
        return res.status(400).send({ message: error.message });
    }

};

module.exports = postVideoGame
