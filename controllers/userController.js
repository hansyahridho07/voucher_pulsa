const convertToRupiah = require('../helpers/convertRupiah')
const email = require('../helpers/server')
const {User, Voucher, Transaction} = require('../models/index')

class UserController{
  static showUser(req,res){
    const id = req.session.user.id
    User.findByPk(id, {include:Voucher})
      .then(data => {
        // res.send(data)
        res.render('user/home.ejs', {user: req.session.user, convertToRupiah, data})
      })
      .catch(err => {
        res.send(err)
      })
  }

  static getTransaction(req,res){
    let user
    User.findByPk(req.params.id)
      .then(data => {
        user = data
        return Voucher.findAll()
      })
      .then(data => {
        res.render('user/transaction', {data, session:req.session.user, user})
      })
      .catch(err => {
        let errors = []
        for(let i = 0; i < err.errors.length; i++){
          errors.push(err.errors[i].message)
        }
        res.send(errors)
      })
  }

  static getEdit(req,res){
    User.findByPk(req.params.id)
      .then(data => {
        res.render('user/edituser.ejs', {data})
      })
      .catch(err => {
        res.send(err)
      })
  }

  static postEdit(req,res){
    const {name, phone_number, email, username} = req.body
    const query = {
      name: name == '' ? null : name, 
      phone_number: phone_number == '' ? null : phone_number, 
      email: email == '' ? null : email, 
      username: username == '' ? null : username
    }
    User.update(query, {where: {id: req.params.id}})
      .then(data => {
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

  static postTransaction(req,res){
    const {VoucherId, qty} = req.body
    const id = req.params.id
    const query = {
      VoucherId: VoucherId == '' ? null : VoucherId, 
      UserId: id, 
      qty: qty == '' ? null : qty
    }
    let harga = 0
    Transaction.create(query)
      .then(data => {
        return Voucher.findByPk(VoucherId)
      })
      .then(data => {
        harga = data.price
        return User.findByPk(id)
      })
      .then(data => {
        data.saldo += harga * qty
        return User.update({saldo: data.saldo}, {where:{id}})
      })
      .then(data => {
        return User.findByPk(id)
        
      })
      .then(data => {
        let obj ={
          nama: data.name,
          saldo: (harga * qty),
          email: data.email,
          phone: data.phone_number
        }
        email(obj)
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
}

module.exports = UserController