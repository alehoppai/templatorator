import passport from "passport"
import { BaseController } from "./baseController.js"
import bcrypt from "bcrypt"

import vars from "../../config/vars.js"
import prisma from "../../utils/prisma.js"

export class AuthController extends BaseController {
  constructor() {
    super([
      ['GET', '/signin', 'signinPage'],
      ['GET', '/signup', 'signupPage'],
      ['POST', '/signup', 'signup'],
      ['DELETE', '/signout', 'signout'],
    ])

    this.router.post('/signin', passport.authenticate('local'), this.signin.bind(this))
  }

  /**
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */
  signinPage(req, res) {
    res.render('pages/signin', { title: 'Sign in' })
  }

  /**
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */
  signin(req, res) {
    req.login(req.user, (err) => {
      if (err) {
        return res.status(500).send('Signin failed')
      }

      res.redirect(vars.protectedHomepage)
    })
  }

  /**
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */
  signupPage(req, res) {
    res.render('pages/signup', { title: 'Sign up' })
  }

  /**
   * @TODO add signup with bcrypt pwd hashing when user model will be ready
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */
  async signup(req, res) {
    const { login, password } = req.body

    try {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)

      await prisma.user.create({
        data: {
          login,
          password: hash,
        },
      })

      res.status(301).redirect(vars.signinPage)
    } catch (err) {
      res.status(500).send('Signup error')
    }
  }

  /**
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */
  signout(req, res, next) {
    req.logout(err => {
      if (err) {
        return next(err)
      }

      req.session.destroy(err => {
        if (err) {
          return next(err)
        }

        res.redirect('/auth/signin')
      })
    })
  }
}
