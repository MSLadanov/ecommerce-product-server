const Router = require('express')

const router = new Router()

const userRouter = require('./userRouter')

const sneakerRouter = require('./sneakerRouter')

router.use('/user', userRouter)
router.use('/sneaker', sneakerRouter)

module.exports = router