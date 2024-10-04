import bodyParser from "body-parser"
import vars from "./vars.js"

export function enableBodyParser(app) {
  if (!vars.enableBodyParser) {
    console.info("CONFIG -- body parser [disabled]")
    return
  }

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  console.info("CONFIG -- body parser [enabled]")
}