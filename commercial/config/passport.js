var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../model/user')
const config = require('../config/database')

module.exports = function(passport){
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
    opts.secretOrKey = config.secret
    console.log(config.secret);

passport.use(new JwtStrategy(opts, function(jwt_payload,done){
    console.log(jwt_payload);

    User.getUserById(jwt_payload._id,(err,user)=>{
        console.log(jwt_payload);
        if(err){
            return done(err,false)
        }

        if(user){
            return done(null,user);
        }
        else{
            return done(null,false)
        }
    })
    
}))

    
}