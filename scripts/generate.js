import { generateController } from "./helpers/controller.js"
import { generatePage } from "./helpers/page.js"


const [what, ...rest] = process.argv.slice(2)


switch(what) {
  case "controller":
  case "c": {
    const [name, ...methods] = rest
    generateController(name, methods)
    break
  }
  case "page":
  case "p": {
    const [name] = rest
    generatePage(name)
    break
  }
  default: break
}