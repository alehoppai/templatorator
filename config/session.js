import path from "node:path"
import fs from "node:fs"

import sqlite3 from "sqlite3"
import session from "express-session"
import sqliteStoreFactory from "express-session-sqlite"

import vars from "./vars.js" 

export function enableSession(app) {
  if (!vars.enableSession) {
    console.info("CONFIG -- session [disabled]")
    return
  }

  const dbPath = path.join(path.resolve(), `../${process.env.SESSIONBASE_URL}`);

  const dirPath = path.dirname(dbPath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.info("CONFIG -- Created directory for session database:", dirPath);
  }

  const SqliteStore = sqliteStoreFactory.default(session)

  app.use(session({
    store: new SqliteStore({
      driver: sqlite3.Database,
      path: path.join(path.resolve(), `../${process.env.SESSIONBASE_URL}`),
    }),
    secret: process.env.APP_SESSION_SECRET || 'my_deepest_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  }))
  console.info("CONFIG -- session [enabled]")
  console.info("CONFIG -- session file ", path.join(path.resolve(), `../${process.env.SESSIONBASE_URL}`))
}