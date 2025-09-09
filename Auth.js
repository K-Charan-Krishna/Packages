const passport=require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy;
require('dotenv').config();



passport.use(new GoogleStrategy({
    clientID:    process.env.CLINT_ID,
    clientSecret: process.env.CLINT_SECRET,
    callbackURL: "http://localhost:5002/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    // console.log('profile: ',profile)
      return done(null, profile);
  }
));

passport.serializeUser(function(user,done){
    done(null,user)
})
passport.deserializeUser(function(user,done){
    done(null,user)
})