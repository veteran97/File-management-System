var mongoose=require('mongoose');

var FiletypeSchema=mongoose.Schema({
  name : {type:String }
});

var Filetype = module.exports = mongoose.model('Filetype', FiletypeSchema);
