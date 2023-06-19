const Router = require('express')
const sneakerController = require('../controllers/sneakerController')
const router = new Router()

router.post('/', sneakerController.createSneaker)

router.get('/', sneakerController.getAllSneakers)

router.get('/:id', sneakerController.getSneakerById)

router.delete('/:id', sneakerController.deleteSneaker)

module.exports = router