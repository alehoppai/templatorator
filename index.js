import dotenv from "dotenv"
dotenv.config()

import express from "express"

import { enableBodyParser } from "./config/bodyParser.js"
import { enableSession } from "./config/session.js"
import router from "./app/router.js"

const app = express()

enableBodyParser(app)
enableSession(app)

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
