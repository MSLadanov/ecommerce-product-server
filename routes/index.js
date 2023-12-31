const Router = require('express')

const router = new Router()

const userRouter = require('./userRouter')

const sneakerRouter = require('./sneakerRouter')

const basketRouter = require('./basketRouter')

router.use('/user', userRouter)
router.use('/sneaker', sneakerRouter)
router.use('/basket', basketRouter)

module.exports = router