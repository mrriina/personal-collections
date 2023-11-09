const Router = require('express')
const router = new Router()
const itemController = require('../controllers/itemController')

router.post('/create', itemController.createItem)
router.get('/getItems', itemController.getItems)

module.exports = router