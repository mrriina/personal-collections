const Router = require('express')
const router = new Router()
const collectionController = require('../controllers/collectionController')

router.post('/create', collectionController.createCollection)
router.post('/getCollectionsByProfileId', collectionController.getCollectionsByProfileId)
router.get('/getCollections', collectionController.getCollections)
router.get('/getCollectionById/:id', collectionController.getCollectionById)
router.get('/getTopCollections', collectionController.getTopCollections)
router.delete('/deleteCollection/:id', collectionController.deleteCollection)
router.put('/updateCollection/:id', collectionController.updateCollectionById)

module.exports = router