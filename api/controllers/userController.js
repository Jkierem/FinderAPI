var UserModel = require('../models/userModel')
var md5 = require('md5')
var dotenv = require('dotenv')
dotenv.load()

let userAtt = '_id fullname nickname email additionalData'

const getUserByNickname = (req , res) =>{
  UserModel.findOne({$or:[{"nickname": req.params.nickname},{"email":req.params.nickname}]},userAtt, function(err , user){
    if(err){
      res.status(404).json({ response: false , error:err })
    }else{
      if( user == null || user == '' ){
        res.json({ response: false , message:`${req.params.nickname} not found` })
      }else{
        res.status(200).json({ response: true , user:user})
      }
    }
  })
}

const getUserById = (req , res ) => {
  UserModel.findOne({"_id": req.params.userId},userAtt, function(err , user){
    if(err){
      res.status(404).json({ response: false , error:err })
    }else{
      if( user == null || user == '' ){
        res.status(404).json({ response: false , message:`${req.params.userId} not found` })
      }else{
        res.status(200).json({response: true , user:user})
      }
    }
  })
}

const getUsers = (req , res) => {
  UserModel.find({}, userAtt , function(err , user){
    if(err){
      res.status(404).json({ response: false , error:err })
    }else{
      if( user == null || user == '' ){
        res.status(404).json({ response: false , message:"No user in your mango" })
      }else{
        res.status(200).json(user)
      }
    }
  })
}

const createUser = (req,res) =>{
  var newUser = new UserModel()
  newUser.fullname = req.body.fullname
  newUser.email = req.body.email
  newUser.nickname = req.body.nickname
  newUser.additionalData = req.body.additionalData
  newUser.password = md5(`${req.body.password}${process.env.SALT}`)
  newUser.save((err,user) =>{
    if(err){
      res.status(500).json({ response: false , error:err})
    }else{
      res.status(200).json({response: true , user:user})
    }
  })
}

const updateUser = (req, res) =>{
  UserModel.findOne({_id: req.params.userId} , function(err,user){
    if(err){
      res.status(500).json({ response: false , error:err})
    }else{
      user.fullname = (req.body.fullname === undefined)? user.fullname : req.body.fullname
      user.email = (req.body.email === undefined)? user.email : req.body.email
      user.additionalData = (req.body.additionalData === undefined)? user.additionalData : req.body.additionalData
      user.password = (req.body.password === undefined)? user.password : md5(`${req.body.password}${process.env.SALT}`)
      user.save(function(err,user){
        if(err){
          res.status(500).json({ response: false , message:`Error on update` , error:err})
        }else{
          res.status(200).json({ response: true , user: user})
        }
      })
    }
  })
}

const deleteUser = (req , res) =>{
  UserModel.findOne({"_id":req.params.userId}, '_id password', function(err,user){
    if(err){
      res.status(500).json({response: false , error:err})
    }else{
      if( user == null || user == '' ){
        res.json({response:false , error:'User does not exist'} )
      }else{
        var hash = md5(`${req.body.password}${process.env.SALT}`)
        if( hash === user.password ){
          UserModel.remove({
            _id: req.params.userId
          }, function(err, user) {
            if (err)
              res.status(500).json({response: false , error:err});
            res.status(200).json({ response:true, message: 'User successfully deleted' });
          });
        }else{
          res.json({response:false , message: `Invalid password ${req.body.password}`})
        }
      }
    }
  })
}

const authenticateUser = (req,res) =>{
  UserModel.findOne({"nickname":req.body.nickname}, '_id fullname nickname email password', function(err,user){
    if(err){
      res.status(500).json({response: false , error:err})
    }else{
      if( user == null || user == '' ){
        res.status(404).json({response:false , error:'User does not exist'} )
      }else{
        var hash = md5(`${req.body.password}${process.env.SALT}`)
        if( hash === user.password ){
          res.status(200).json({ response: true , message: "You are now logged in", user:user})
        }else{
          res.status(404).json({response:false , message: "Invalid user and password combination"})
        }
      }
    }
  })
}

module.exports={
  getUserById,
  getUserByNickname,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  authenticateUser
}
