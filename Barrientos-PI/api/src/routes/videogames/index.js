const { Router } = require('express');
const router = Router();
const { getVideogames, getVdByName, getVdById, postVd, deleteVd } = require('../../handlers/videogames/handlersVideogames');

router.get('/', getVideogames);
router.get('/search', getVdByName);
router.get('/:id', getVdById);
router.delete('/:id', deleteVd)
router.post('/', postVd);


module.exports = router;
