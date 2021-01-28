const router = require('express').Router()
const authenticantion = require('../middlewares/authentication')
const UserController = require('../controllers/userController')

router.get('/',authenticantion,UserController.showUser)

router.get('/edit', UserController.edit);
router.post('/edit', UserController.editPost);
router.get('/transaction', UserController.topup);
router.get('/vouchers', UserController.listVoucher);

module.exports = router