const {User, Voucher} = require('../models')
const {hash, compare} = require('../helpers/bycript')
const convertToRupiah = require('../helpers/convertRupiah')
class Controller{
  static showHome(req,res){
    res.render('index.ejs', {data: req.session.user})
  }

  static register(req,res){ //Get register
    res.render('register.ejs')
  }

  static getLogin(req,res){//Get login
    res.render('login.ejs')
  }

  // static getVoucher(req,res){
  //   Voucher.findAll()
  //     .then(data => {
  //       res.redirect('/voucher/voucher.ejs', {data})
  //     })
  //     .catch(err => {
  //       red.send(err)
  //     })
    
  // }
  static getVoucher(req,res){
    Voucher.findAll()
      .then(data => {
        res.render('voucher/voucher.ejs', {data, convertToRupiah})
      })
      .catch(err => {


        res.send(err)
      })
  }

  static postLogin(req,res){ //Post login
    const {password} = req.body
    let username = req.body.username == '' ? null : req.body.username

    User.findOne({where: {username}})
      .then(data => {
        if(compare(password, data.password)){
          req.session.user = {
            id: data.id,
            name: data.name,
            phone_number: data.phone_number,
            email: data.email,
            saldo: data.saldo
          }
          // res.send(data)
          res.redirect('/users')
        }
      })
      .catch(err => {
        console.log(err);
        res.send(err)
      })
  }

  static postRegister(req,res){ //Post register
    // res.redirect('/users')
    const {name,phone_number,username,password,email} = req.body
    const user = {
      name: name == '' ? null : name, 
      phone_number: phone_number == '' ? null : phone_number,
      username: username == '' ? null : username,
      password: password == '' ? null :password,
      email: email == '' ? null : email,
      saldo: 0
    }

    User.create(user)
      .then(data => {
        req.session.user = {
          id: data.id,
          name: data.name,
          phone_number: data.phone_number,
          email: data.email,
          saldo: data.saldo
        }
        res.redirect('/users')
      })
      .catch(err => {
        let errors = []
        for(let i = 0; i < err.errors.length; i++){
          errors.push(err.errors[i].message)
        }
        res.send(errors)
      })
  }

  static logout(req,res) {
    req.session.user = null
    res.redirect('/')
  }
}

module.exports = Controller