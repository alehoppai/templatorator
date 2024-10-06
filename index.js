import dotenv from "dotenv"
dotenv.config()

import express from "express"

import { enableBodyParser } from "./config/bodyParser.js"
import { enableSession } from "./config/session.js"
import { enablePassport} from "./config/passport.js"
import { enableRoutes } from "./config/routes.js"
import { enableViews } from "./config/viewSetup.js"

const app = express()

enableBodyParser(app)
enableSession(app)
enablePassport(app)
enableRoutes(app)
enableViews(app)

app.use(express.static('public'))

app.listen(
  Number(process.env.APP_PORT),
  process.env.APP_HOST,
  () => {
    console.info(
      "SERVER -- started on",
      process.env.APP_HOST + ":" + process.env.APP_PORT,
    )
  }
)
