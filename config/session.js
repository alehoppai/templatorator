import path from "node:path"

import * as sqlite3 from "sqlite3"
import session from "express-session"
import sqliteStoreFactory from "express-session-sqlite"

import vars from "./vars.js" 

export function enableSession(app) {
  if (!vars.enableSession) {
    console.info("CONFIG -- session [disabled]")
    return
  }

  const SqliteStore = sqliteStoreFactory.default(session)
  app.use(session({
    store: new SqliteStore({
      driver: sqlite3.Database,
      path: path.join(path.resolve(), `../${process.env.SESSIONBASE_URL}`),
      secret: process.env.APP_SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true },
    })
  }))
  console.info("CONFIG -- session [enabled]")
  console.info("CONFIG -- session file ", path.join(path.resolve(), `../${process.env.SESSIONBASE_URL}`))
}