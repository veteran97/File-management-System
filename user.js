const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const router = express.Router();

const User = require('../models/user');
const Department = require('../models/department');
const Filetype = require('../models/filetype');
	
router.get('/login',(req,res)=>{
	res.render('login');
})

passport.use(new LocalStrategy(function(username, password, done){
    var query = {email:username};
    User.findOne(query,(err, user)=>{
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'No user found'});
      }
      // console.log(password);
      // console.log(user.password);
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

router.post('/login',
	passport.authenticate('local',{successRedirect:'/user/home',failureRedirect:'/user/login',failureFlash:true}),
	(req,res)=>{
		res.redirect('/user/home')
	})

router.get('/signup',(req,res)=>{
	res.render('signup');
})

router.post('/signup',(req,res)=>{
	if(req.body.secretKey.toString() == 'guru')
	{
		//console.log("match");
		var newUser = User();
		newUser.email = req.body.email
		newUser.username = req.body.username;
		bcrypt.genSalt(10,(err,salt)=>{
			if(err) throw err;
			bcrypt.hash(req.body.password,salt,(err,hash)=>{
				if(err) throw err;
				newUser.password = hash;
				newUser.save();
				res.redirect('/user/login');
			});
		})
	}
	else
	{
		//console.log("does not match");
		res.redirect('/user/signup');

	}

})

router.get('/logout',(req,res)=>{
	req.logout();
	res.redirect('/');
})

router.get('/add/department',ensureAuthenticated,(req,res)=>{
	Department.find({},(err,departments)=>{
		if(err) throw err;
		res.render('department',{departments:departments});
	})
})	

router.post('/add/department',ensureAuthenticated,(req,res)=>{
	var newDepartment = Department();
	newDepartment.name = req.body.name;
	newDepartment.save();
	res.redirect('/user/add/department');
})

router.get('/delete/department/:departmentId',ensureAuthenticated,(req,res)=>{
	Department.remove({_id:req.params.departmentId},(err,department)=>{
		if(err) throw err;
    	req.flash('success_msg', 'Department Succesfully Deleted');
    	res.redirect('/user/add/department');
	})
})

router.get('/add/filetype',ensureAuthenticated,(req,res)=>{
	Filetype.find({},(err,filetypes)=>{
		if(err) throw err;
		res.render('filetype',{types:filetypes});
	})
})

router.post('/add/filetype',ensureAuthenticated,(req,res)=>{
	var newFiletype = Filetype();
	newFiletype.name = req.body.name;
	newFiletype.save();
	res.redirect('/user/add/filetype');
})

router.get('/delete/filetype/:filetypeId',ensureAuthenticated,(req,res)=>{
	Filetype.remove({_id:req.params.filetypeId},(err,filetype)=>{
		if(err) throw err;
    	req.flash('success_msg', 'Filetype Succesfully Deleted');
    	res.redirect('/user/add/filetype');
	})
})

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/user/login');
  }
}

module.exports = router;

