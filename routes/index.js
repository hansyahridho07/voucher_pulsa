const router = require('express').Router()
const Controller = require('../controllers/controller')
const users = require('./user')
const authenticantion = require('../middlewares/authentication')

//register dan home
router.get('/', Controller.showHome)
router.get('/register', Controller.register)
router.post('/register', Controller.postRegister)
//login
router.get('/login', Controller.getLogin)
router.post('/login', Controller.postLogin)
router.get('/logout', authenticantion, Controller.logout)
//voucher
router.get('/vouchers', Controller.getVoucher)

router.use('/users', users)

module.exports = router