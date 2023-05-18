const { Router } = require('express');
const router = Router();
const { getVideogames, getVdByName, getVdById, postVd } = require('../../handlers/videogames/handlersVideogames');

router.get('/', getVideogames);
router.get('/search', getVdByName);
router.get('/:id', getVdById);
router.post('/', postVd);

module.exports = router;
