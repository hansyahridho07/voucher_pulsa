const convertToRupiah = require('../helpers/convertRupiah')
const {User, Voucher} = require('../models/index')

class UserController{
  static showUser(req,res){
    res.render('user/home.ejs', {data: req.session.user, convertToRupiah})
  }

  static edit(req, res) {
    User.findAll()
    .then((result) => {
      res.render('user/editData', { data: result[0] });
      console.log(result[0].name);
    })
    .catch((err) => {
      res.send(err.message);
    })
  }

  static editPost(req, res) {
    const { name, phone_number, username, password, email } = req.body;
    const updateUser = {
      name,
      phone_number,
      username,
      password,
      email
    }
    User.update(updateUser, {
      where: { }
    })
    .then(() => {
      res.redirect('/users')
    })
    .catch((err) => {
      res.send(err.message);
    })
  }

  static topup(req, res) {
    res.render('/user/topup')
  }

  static listVoucher(req, res) {
    Voucher.findAll()
    .then((data) => {
      res.render('user/voucherList', { data })
      // console.log(data);
    })
    .catch((err) => {
      res.send(err.message);
    })
  }
}

module.exports = UserController