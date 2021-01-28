
const convertToRupiah = require('./convertRupiah')
const nodemailer = require('nodemailer');

function email(obj){
  console.log(obj);
  //Step 1
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
      user: 'helsinkibatch08@gmail.com',
      pass: 'batch08hacktiv8'
    }
  })

  let token = String(Math.random()).slice(2)
  //Step 2
  let mailOptions = {
    from: 'helsinkibatch08@gmail.com',
    to: `${obj.email}`,
    subject: 'Berhasil membeli pulsa',
    text: `Terima kasih atas pembelian pulsa sebesar ${convertToRupiah(obj.saldo)} atas nama ${obj.nama}, dengan
    token pembelian ${token} dengan phone number ${obj.phone}`
  }
  
  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
  
  //Step 3
  transporter.sendMail(mailOptions, (err,data) => {
    if(err){
      console.log(err);
    } else {
      console.log('Email Sent');
    }
  })
}

module.exports = email