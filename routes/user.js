const router = require('express').Router()
const authenticantion = require('../middlewares/authentication')
const UserController = require('../controllers/userController')

router.get('/',authenticantion,UserController.showUser)


router.get('/edit', UserController.edit);
router.post('/edit', UserController.editPost);
router.get('/transaction', UserController.topup);
router.get('/vouchers', UserController.listVoucher);

router.get('/transaction/:id', authenticantion, UserController.getTransaction)
router.post('/transaction/:id', authenticantion, UserController.postTransaction)
router.get('/edit/:id', authenticantion, UserController.getEdit)
router.post('/edit/:id', authenticantion, UserController.postEdit)


module.exports = router