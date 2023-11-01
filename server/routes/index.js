const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const collectionRouter = require('./collectionRouter')

router.use('/user', userRouter)
router.use('/collection', collectionRouter)

module.exports = router