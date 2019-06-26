const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const passport=require('passport');

module.exports = function(passport){
  //console.log('here');
  passport.use(new LocalStrategy(function(email, password, done){
    let query = {email:email};
    User.findOne(query,(err, user)=>{
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'No user found'});
      }
      console.log(password);
      console.log(user.password);
      bcrypt.compare(password, user.password,(err, isMatch)=>{
        if(err) throw err;
        if(isMatch){
          return done(null, user);
        } else {
          return done(null, false, {message: 'Wrong password'});
        }
      });
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}
