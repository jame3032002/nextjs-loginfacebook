const FacebookStrategy = require('passport-facebook').Strategy
const mongoose = require('mongoose')

const User = mongoose.model('users')

module.exports = {
  serializeUser: async (user, done) => {
    done(null, user)
  },
  deserializeUser: async (user, done) => {
    done(null, user)
  },
  facebookStrategy: new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL
  }, async (accessToken, refreshToken, profile, done) => {
    User.findOne({ facebookId: profile.id }).then(user => {
      if (user) {
        // already have a record
        done(null, user)
      } else {
        // add new record
        new User({ facebookId: profile.id, displayName: profile.displayName })
          .save()
          .then(user => done(null, user))
      }
    })
  })
}
