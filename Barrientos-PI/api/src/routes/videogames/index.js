const { Router } = require('express');
const router = Router();
const { getVideogames, getVdByName, getVdById, postVd } = require('../../handlers/videogames/hanldersVideogames');

router.get('/', getVideogames);
router.get('/search', getVdByName);
router.get('/:id', getVdById);
router.post('/', postVd);

module.exports = router;
