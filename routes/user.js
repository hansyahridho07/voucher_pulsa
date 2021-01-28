const router = require('express').Router()
const authenticantion = require('../middlewares/authentication')
const UserController = require('../controllers/userController')

router.get('/',authenticantion,UserController.showUser)

router.get('/transaction/:id', authenticantion, UserController.getTransaction)
router.post('/transaction/:id', authenticantion, UserController.postTransaction)
router.get('/edit/:id', authenticantion, UserController.getEdit)
router.post('/edit/:id', authenticantion, UserController.postEdit)

module.exports = router