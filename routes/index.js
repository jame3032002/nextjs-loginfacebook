const passport = require('passport')
const cookieSession = require('cookie-session')

module.exports = (app, server) => {
  server.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [process.env.KEYS_SESSION]
    })
  )

  server.use(passport.initialize())
  server.use(passport.session())

  server.get('/user', (req, res) => {
    app.render(req, res, '/user', req.user)
  })

  server.get('/auth/facebook', passport.authenticate('facebook'))

  server.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/user',
    failureRedirect: '/'
  }))
}
