import dotenv from "dotenv"
dotenv.config()

import express from "express"

import { enableBodyParser } from "./config/bodyParser.js"
import { enableSession } from "./config/session.js"
import { enableViews } from "./config/viewSetup.js"
import router from "./app/router.js"

const app = express()

enableBodyParser(app)
enableSession(app)
enableViews(app)

app.use(router)

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
