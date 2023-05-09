const { Router } = require('express');
const getAllVideoGames = require('../../controllers/getAllVideogames');
const getVideoGameById = require('../../controllers/getVideoGameById');
const getByName = require('../../controllers/getByName');
const router = Router();

router.get('/', async (req, res) => {
    getAllVideoGames(req, res)} );

router.get('/search', async (req, res) => {
    getByName(req, res)} );

router.get('/:id', async (req, res) => {
    getVideoGameById(req, res)} );

router.post('/', async (req, res) => {
    postVideoGame(req, res)} );

module.exports = router;
