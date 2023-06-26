const Router = require('express')
const basketController = require('../controllers/basketController')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/all',checkRole('admin'), basketController.getAllBaskets)

router.get('/',authMiddleware, basketController.getBaskets)

router.post('/',authMiddleware, basketController.sendBasket)

router.post('/:id',checkRole('admin'), basketController.changeBasketStatus)

router.delete('/:id',checkRole('admin'), basketController.deleteBasket)

module.exports = router