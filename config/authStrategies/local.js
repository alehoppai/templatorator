import passport from 'passport'
import LocalStrategy from 'passport-local'

// TODO: prepare proper auth strategy when models will be ready
const localStrategy = new LocalStrategy(
  {
    usernameField: 'login',
    passwordField: 'password',
  },
  (login, password, done) => {
    // FIXME: should be model from prisma
    User.findOne({ login }, (err, user) => {
      if (err) {
        return done(err)
      }
      if (!user || !user.validatePassword(password)) {
        return done(null, false, { message: 'Incorrect credentials.' })
      }

      return done(null, user)
    })
  },
)

passport.use(localStrategy)
