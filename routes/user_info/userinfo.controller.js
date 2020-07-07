'use strict';
var mongoose = require('mongoose');
var bycrypt = require('bcrypt');
var multer  = require('multer');
var path  = require('path');
var userModal = require('./userinfo.modal');
    var controller = {}


    const { roles } = require('./../Server/roles')
 
    exports.grantAccess = function(action, resource) {
     return async (req, res, next) => {
      try {
       const permission = roles.can(req.user.role)[action](resource);
       if (!permission.granted) {
        return res.status(401).json({
         error: "You don't have enough permission to perform this action"
        });
       }
       next()
      } catch (error) {
       next(error)
      }
     }
    }
     
    exports.allowIfLoggedin = async (req, res, next) => {
     try {
      const user = res.locals.loggedInUser;
      if (!user)
       return res.status(401).json({
        error: "You need to be logged in to access this route"
       });
       req.user = user;
       next();
      } catch (error) {
       next(error);
      }
    }
    
    // router.post("/signup", (req, res) => {
        controller.signup = function(req, res){
        userModal.find({ email: req.body.email,role:req.body})
          .exec()
          .then(user => {
            console.log(req.body.email)
            console.log('=======',user)
            console.log(user.length)
            if (user.length >= 1) {
              response.data = null;
              response.error = "Email Already Exists";
              res.status(400);
              res.send(response);
            } 
                 else {
                  const user = new User({
                     _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                            fname:req.body.fname,
                    user_name:req.body.user_name,
                            image:req.body.image,
                    password:req.body.password ,
                    role: role || "basic"
                  });
                  const accessToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
                    expiresIn: "1d"
                   });
                   }
                  user.accessToken = accessToken
                    .save()
                    .then(result => {
                      console.log(result);
                       res.send(result,accessToken);
                  })
                    .catch(err => {
                      console.log(err);
                      res.status(500).json({
                        error: err
                      });
                    });
          });
        }
          controller.login =function(req,res,next){
        userModal.find({ email: req.body.email})
           .exec()
          .then(user => {
            if (user.length >= 1) {
             if(user[0].password == req.body.password){
              response.data = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
              response.error = null;
              res.send(response);
             }
             else{
              response.data = null;
              response.error = "Email and Password are Incorrect";
              res.status(400);
                      res.send(response);
             }
             const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
              expiresIn: "1d"
             });
              User.findByIdAndUpdate(user._id, { accessToken })
             res.status(200).json({
              data: { email: user.email, role: user.role },
              accessToken
             })
            } 
                 })
              }
          
          controller.getUsers = async (req, res, next) => {
            const users = await userModal.find({});
            res.status(200).json({
             data: users
            });
           }
            
           controller.getUser = async (req, res, next) => {
            try {
             const userId = req.params.userId;
             const user = await userModal.findById(userId);
             if (!user) return next(new Error('User does not exist'));
              res.status(200).json({
              data: user
             });
            } catch (error) {
             next(error)
            }
           }
            
           controller.updateUser = async (req, res, next) => {
            try {
             const update = req.body
             const userId = req.params.userId;
             await userModal.findByIdAndUpdate(userId, update);
             const user = await userModal.findById(userId)
             res.status(200).json({
              data: user,
              message: 'User has been updated'
             });
            } catch (error) {
             next(error)
            }
           }
            
           controller.deleteUser = async (req, res, next) => {
            try {
             const userId = req.params.userId;
             await userModal.findByIdAndDelete(userId);
             res.status(200).json({
              data: null,
              message: 'User has been deleted'
             });
            } catch (error) {
             next(error)
            }
           }

    module.exports = controller; 

