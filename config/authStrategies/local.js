import passport from 'passport'
import LocalStrategy from 'passport-local'

passport.use(new LocalStrategy((login, password, done) => {
  User.findOne({ login }, (err, user) => {
    if (err) {
      return done(err)
    }
    if (!user || !user.validatePassword(password)) {
      return done(null, false, { message: 'Incorrect credentials.' })
    }

    return done(null, user)
  })
}))
