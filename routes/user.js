const router = require('express').Router()
const authenticantion = require('../middlewares/authentication')
const UserController = require('../controllers/userController')

router.get('/',authenticantion,UserController.showUser)

module.exports = router