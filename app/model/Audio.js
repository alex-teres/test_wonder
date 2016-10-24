var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
var User = require('./user');

module.exports = function(app) {

  var Schema = new mongoose.Schema({
    title:{
      type:String,
      required:true
    },
    artist:{
      type:String,
      required:true
    },
    link:{
      type:String,
      required:true
    },
    owner:{
      type:ObjectId,
      ref: 'user'
    }
  });

  Schema.pre('save', function(next) {
    this.owner = app.user.id;
    User.update({_id: app.user._id},{$pushAll: {audio:[this._id]}}, function(err){
      if(err){
        console.log(err);
      }else{
        console.log("Successfully added audio file");
      }
    });
    next();
  });

  return mongoose.model('audio', Schema);
};








