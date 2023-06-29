const Router = require('express')
const basketController = require('../controllers/basketController')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/all',checkRole('admin'), basketController.getAllBaskets)

router.get('/',authMiddleware, basketController.getBaskets)

router.post('/send',authMiddleware, basketController.sendBasket)

router.post('/cancel/:id',authMiddleware, basketController.cancelBasket)

router.patch('/change',checkRole('admin'), basketController.changeBasketStatus)

router.delete('/delete/:id',checkRole('admin'), basketController.deleteBasket)

module.exports = router