const { Genre } = require('../db.js')
const URL = 'https://api.rawg.io/api/genres';
const { API_KEY } = process.env;

const getAllGenres = async (req, res) => {
    try {
        const allGenres = await Genre.findAll();
        return res.status(200).json(allGenres);
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

module.exports = getAllGenres