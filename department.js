var mongoose=require('mongoose');

var DepartmentSchema=mongoose.Schema({
  name : {type:String }
});

var Department = module.exports = mongoose.model('Department', DepartmentSchema);
