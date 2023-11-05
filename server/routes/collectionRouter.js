const Router = require('express')
const router = new Router()
const collectionController = require('../controllers/collectionController')

router.post('/create', collectionController.createCollection)
router.post('/getCollectionsByProfileId', collectionController.getCollectionsByProfileId)
router.get('/getCollectionById/:id', collectionController.getCollectionById)
router.delete('/deleteCollection/:id', collectionController.deleteCollection)

module.exports = router