const { Router } = require('express');
const router = Router();
const getAllGenres = require('../../controllers/getAllGenres')

router.get('/', async (req, res) => {
    getAllGenres(req, res)} );

module.exports = router;
