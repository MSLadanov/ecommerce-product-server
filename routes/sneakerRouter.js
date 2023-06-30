const Router = require('express')
const sneakerController = require('../controllers/sneakerController')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('admin'), sneakerController.createSneaker)

router.get('/', sneakerController.getAllSneakers)

router.get('/:id', sneakerController.getSneakerById)

router.delete('/delete/:id',checkRole('admin'), sneakerController.deleteSneaker)

module.exports = router