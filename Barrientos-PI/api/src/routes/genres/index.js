const { Router } = require('express');
const router = Router();
const getGenres = require('../../handlers/genres/hanldersGenres')

router.get('/', getGenres);

module.exports = router;