var mongoose=require('mongoose');

var UserSchema=mongoose.Schema({
  email:{ type:String },
  username:{  type:String },
  password:{  type:String }
});

var User= module.exports = mongoose.model('User', UserSchema);
