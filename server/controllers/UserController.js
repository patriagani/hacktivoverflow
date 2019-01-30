const User = require('../models/User')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(process.env.SALT);
const jwt = require('jsonwebtoken')
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: process.env.SENDEREMAIL,
        pass: process.env.SENDEREMAILPASSWORD
    }
});

let mailOptions = {
  from: 'dummypatria@gmail.com', // sender address
  to: "", // list of receivers
  subject: 'Welcome To HacktivOverflow', // Subject line
  html: '<h2>Hello Welcome To HacktivOverflow</h2><br><h3>We are glad you are here :)</h3>'// plain text body
};

class UserController {

  static getUsers(req, res) {
    User.find()
      .then(function(users) {
        res.status(200).json(users)
      })
      .catch(function(error) {
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }

  static register(req, res) {
    let password = bcrypt.hashSync(req.body.password, salt);
    let obj = {
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: password,
    }

    User.create(obj)
      .then(function(user) {
        mailOptions.to = req.body.email
        transporter.sendMail(mailOptions, function (err, info) {
           if(err)
             console.log(err)
           else
             console.log(info);
        });
        res.status(200).json(user)
      })
      .catch(function(error) {
        console.log(error.message);
        res.status(500).json({
          message: "Internal Server Error",
          error: error.message
        })
      })
  }

  static getUser(req, res) {
    User.findById(req.params.userId)
      .then(function(user) {
        res.status(200).json(user)
      })
      .catch(function(error) {
        console.log(error.message);
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }

  static updateUser(req, res) {
    User.findOneAndUpdate({_id: req.params.userId}, req.body)
      .then(function(user) {
        res.status(200).json(user)
      })
      .catch(function(error) {
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }

  static deleteUser(req, res) {
    User.findOneAndDelete({_id: req.params.id})
      .then(function(user) {
        res.status(200).json(user)
      })
      .catch(function(error) {
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }

  static signin(req, res) {
    User.findOne({email: req.body.email})
      .then(function (user) {
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
          let payload = {
            _id: user._id,
            name: user.name,
            email: user.email,
          }

          let token = jwt.sign(payload, process.env.JWT_SECRET);
          res.status(200).json({
            token: token,
            id: payload._id,
            name: payload.name
          })
        }
        else {
          res.status(401).json({
            message: "Wrong email/password",
          })
        }
      })
      .catch(function(error) {
        console.log(error.message);
        res.status(500).json({
          message: "Internal server error",
          error: error.message
        })
      })
  }
}

module.exports = UserController