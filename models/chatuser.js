const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({


    name: { type: String, required: true,   unique:true,
         dropDups: true },
    password: { type: String, required: true,   unique:true,
         dropDups: true }


})

const ChatUser = module.exports = mongoose.model('ChatUser',UserSchema)

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      console.log(newUser.password);
      newUser.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  console.log("first hash")
  console.log(hash)
if (typeof candidatePassword === 'string' || candidatePassword instanceof String){

  console.log("string")
}  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    console.log(candidatePassword)
    console.log(hash)
    console.log(hash.length)
    if(err) throw err;
    console.log(isMatch)
    callback(null, isMatch);
  });
}