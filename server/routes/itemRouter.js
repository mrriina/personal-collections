const Router = require('express')
const router = new Router()
const itemController = require('../controllers/itemController')

router.post('/create', itemController.createItem)
router.post('/getItems', itemController.getItemsById)

module.exports = router