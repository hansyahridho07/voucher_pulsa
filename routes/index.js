const router = require('express').Router()
const Controller = require('../controllers/controller')
const users = require('./user')
const authenticantion = require('../middlewares/authentication')

router.get('/', Controller.showHome)
router.get('/login', Controller.getLogin)
router.get('/register', Controller.register)
router.post('/register', Controller.postRegister)
router.post('/login', Controller.postLogin)
router.get('/logout', authenticantion, Controller.logout)

router.use('/users', users)

module.exports = router