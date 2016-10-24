var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var user = require('../model/user');

var conf = require('../../config') ;
var opts = {};


module.exports = function (app) {
	opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
	opts.secretOrKey = conf.jwtSecretKey;
    console.log(app);
	passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
	    console.log(jwt_payload);
        user.findById(jwt_payload._id, function(err, user) {
           app.user = user;
           if (err) {
            return done(err, false);
        }
            return done(null, user);

    });
    }));
};