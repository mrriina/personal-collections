const Router = require('express')
const router = new Router()
const itemController = require('../controllers/itemController')

router.post('/create', itemController.createItem)
router.post('/getItems', itemController.getItemsById)
router.delete('/deleteItem/:id', itemController.deleteItem)
router.put('/updateItem/:id', itemController.updateItemById)

module.exports = router