const getAllVideoGames = require('../controllers/getAllVideogames');
const getByName = require('../controllers/getByName');
const getVideoGameById = require('../controllers/getVideoGameById');
const postVideoGame = require('../controllers/postVideoGame');

module.exports = {
    getAllVideoGames,
    getByName,
    getVideoGameById,
    postVideoGame
}