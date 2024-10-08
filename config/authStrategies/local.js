import passport from 'passport'
import LocalStrategy from 'passport-local'
import bcrypt from "bcrypt"

import prisma from "../../utils/prisma.js"

// TODO: prepare proper auth strategy when models will be ready
const localStrategy = new LocalStrategy(
  {
    usernameField: 'login',
    passwordField: 'password',
  },
  async (login, password, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { login } })
      if (!user) {
        return done(null, false, { message: 'Incorrect credentials.' })
      }
      
      const passwordIsValid = bcrypt.compare(user.password, password)
      if (!passwordIsValid) {
        return done(null, false, { message: 'Incorrect credentials.' })
      }

      done(null, user)
    } catch(err) {
      done(err)
    }
  },
)

passport.use(localStrategy)
