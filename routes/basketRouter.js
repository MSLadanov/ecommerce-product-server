const Router = require('express')
const basketController = require('../controllers/basketController')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/all',checkRole('admin'), basketController.getAllBaskets)

router.get('/', basketController.getBasket)

router.post('/', basketController.sendBasket)

router.post('/:id',checkRole('admin'), basketController.changeBasketStatus)

router.delete('/:id', basketController.deleteBasket)

module.exports = router