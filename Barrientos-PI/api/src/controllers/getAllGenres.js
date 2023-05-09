const axios = require('axios');
const { Genre } = require('../db.js')
const URL = 'https://api.rawg.io/api/genres';
const { API_KEY } = process.env;

const getAllGenres = async (req, res) => {
    try {
        const { data } = await axios.get(`${URL}?key=7ef48bb5b05d4472b3fb6345a9456ed0`);
        const genres = data.results.map((obj) => {
            return {
                name: obj.name
            }
        });
        await Genre.bulkCreate(genres);
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