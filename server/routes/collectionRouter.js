const Router = require('express')
const router = new Router()
const collectionController = require('../controllers/collectionController')

router.post('/create', collectionController.createCollection)

module.exports = router