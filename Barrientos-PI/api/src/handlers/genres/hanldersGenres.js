const getAllGenres = require('../../controllers/genres');

const getGenres = async (req, res) => {
    try {
        const genres = await getAllGenres()
        return res.status(200).json(genres);
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

module.exports = getGenres