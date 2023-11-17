const Router = require('express')
const router = new Router()
const commentController = require('../controllers/commentController')

router.post('/create', commentController.createComment)
router.get('/getCommentsByItemId/:itemId', commentController.getCommentsByItemId)

module.exports = router