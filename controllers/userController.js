const convertToRupiah = require('../helpers/convertRupiah')
const {User, Voucher} = require('../models/index')

class UserController{
  static showUser(req,res){
    res.render('user/home.ejs', {data: req.session.user, convertToRupiah})
  }
}

module.exports = UserController