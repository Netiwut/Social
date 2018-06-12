const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('../config/database')

const UserScheme = mongoose.Schema({

    email: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
    },
    gender: {
        type: String,
        require: true
    },
    birthdate: {
        type: String,
        require: true
    }

})

const User = module.exports = mongoose.model('User',UserScheme)

module.exports.getUserById = function(id,callback){
    User.findById(id,callback)
}

module.exports.getUserByUsername = function(username,callback){
    const query = {username: username}
    User.findOne(query,callback)
}

module.exports.addUser = function(newUser, callback){
    const query = {username: newUser.username}
    User.count(query,function(err,count){
        if(count>0){
            callback(null,count)
        }
        else{
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save(callback)
                })
            })
        }
    })
}

module.exports.comparePassword = function(candidatePassword,hash,callback){
    bcrypt.compare(candidatePassword,hash,(err,isMatch)=>{
        if(err) throw err;
        callback(null,isMatch)
    })
}