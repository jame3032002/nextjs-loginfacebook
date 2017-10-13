const FacebookStrategy = require('passport-facebook').Strategy

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
    done(null, profile)
  })
}
