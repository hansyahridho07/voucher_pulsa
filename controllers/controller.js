const {User} = require('../models/index')
const {hash, compare} = require('../helpers/bycript')
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

  static postLogin(req,res){ //Post login
    const {username, password} = req.body
    User.findOne({where: {username: username}})
      .then(data => {
        if(compare(password, data.password)){
          req.session.user = {
            id: data.id,
            name: data.name,
            phone_number: data.phone_number,
            email: data.email,
            saldo: data.saldo
          }
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
      name, phone_number,username,password,email,saldo: 0
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
        console.log(err);
        res.send(err)
      })
  }

  static logout(req,res) {
    req.session.user = null
    res.redirect('/')
  }
}

module.exports = Controller