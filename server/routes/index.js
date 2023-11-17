const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const collectionRouter = require('./collectionRouter')
const itemRouter = require('./itemRouter')
const commentRouter = require('./commentRouter')

router.use('/user', userRouter)
router.use('/collection', collectionRouter)
router.use('/item', itemRouter)
router.use('/comment', commentRouter)

module.exports = router