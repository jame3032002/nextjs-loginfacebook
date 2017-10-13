const express = require('express')
const next = require('next')
const passport = require('passport')
const cookieSession = require('cookie-session')
const FacebookStrategy = require('passport-facebook').Strategy

require('dotenv').config()

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
  done(null, profile)
}))

app.prepare().then(() => {
  const server = express()

  server.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: ['testesterww3432']
    })
  )

  server.use(passport.initialize())
  server.use(passport.session())

  server.get('/user', (req, res) => {
    res.send(req.user)
  })

  server.get('/auth/facebook', passport.authenticate('facebook'))

  server.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/user',
    failureRedirect: '/login'
  }))

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
