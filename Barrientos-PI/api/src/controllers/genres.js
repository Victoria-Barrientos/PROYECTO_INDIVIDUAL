const { Genre } = require('../db.js');

const getAllGenres = async () => {
        const allGenres = await Genre.findAll();
        return allGenres
};

module.exports = getAllGenres

// const axios = require('axios');
// const { Genre } = require('../db.js')
// const URL = 'https://api.rawg.io/api/genres';
// const { API_KEY } = process.env;

// const getAllGenres = async (req, res) => {
//     try {
//         const { data } = await axios.get(`${URL}?key=7ef48bb5b05d4472b3fb6345a9456ed0`);
//         const genres = data.results.map((obj) => {
//             return {
//                 name: obj.name
//             }
//         });
//         await Genre.bulkCreate(genres);
//         const allGenres = await Genre.findAll();
//         return allGenres;
//     } catch(error) {
//         throw error
//     }
// };
// module.exports = getAllGenres