const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/users', userController.getUsers)
router.get('/users/:id', userController.getUserById)
router.delete('/users', userController.deleteUsers)
router.delete('/users/:id', userController.deleteUserById)
router.put('/users', userController.updateUsers)
router.put('/users/:id', userController.updateUserById)

module.exports = router