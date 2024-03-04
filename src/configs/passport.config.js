const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: global.config.oauth.clientID,
    clientSecret: global.config.oauth.clientSecret,
    callbackURL: global.config.oauth.callbackURL
},
    accessToken => {
        console.log("accessToken;;", accessToken);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

module.exports = passport;

