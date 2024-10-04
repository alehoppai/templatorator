import dotenv from "dotenv"
dotenv.config()

import * as express from "express"

import { enableBodyParser } from "../config/bodyParser"
import { enableSession } from "../config/session"
import router from "../app/router"

const app = express()

enableBodyParser()
enableSession()

app.use(router)
