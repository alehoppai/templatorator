import passport from "passport"

// Import strategies you want to use
import "./authStrategies/local.js"

passport.serializeUser((user, cb) => {
  process.nextTick(() => cb(null, {
    id: user.id,
    // Add required fields from user model here
  }))
})

passport.deserializeUser((user, cb) => {
  process.nextTick(() => cb(null, user))
})

/**
 * @param {import('express').Application} app 
 */
export function enablePassport(app) {
  app.use(passport.initialize())
  app.use(passport.session())
}