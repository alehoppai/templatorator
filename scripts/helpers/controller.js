import fs from "node:fs"
import path from "node:path"

import { capitalize, findLineAfterKeyword } from "./utils.js"

/**
 * Creates controller template
 * @param {string} name 
 * @param {string[]} methods 
 * @returns 
 */
const controllerTemplate = (name, methods) => `
import { BaseController } from "./baseController.js"

export class ${capitalize(name)}Controller extends BaseController {
  constructor() {
    super([
      // Map your route here [string, string, string]
      // [METHOD, PATH, METHOD_NAME]
    ])
  }

  ${methods.map(method => `${method}(req, res) {}`).join('\n  ')}
}
`
const controllerForPageTemplate = (name) => `
import { BaseController } from "./baseController.js"

export class ${capitalize(name)}Controller extends BaseController {
  constructor() {
    super([
      ['GET', '/', 'index']
      // Map your rest routes here [string, string, string]
      // [METHOD, PATH, METHOD_NAME]
    ])
  }

  /**
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */
  index(req, res) {
    res.render("pages/${name}", { title: "${capitalize(name)} page" })
  }
}
`

/**
 * Helps generate controller with empty methods
 * and mapping its methods to router
 * @param {string} name 
 * @param {string[]} methods 
 * @param {boolean} forPage
 * @param {boolean} protectedRoute
 */
export function generateController(
  name,
  methods = [],
  forPage = false,
  protectedRoute = false,
) {
    const routerPath = path.join(path.resolve(), 'config/routes.js')
    const template = forPage
      ? controllerForPageTemplate(name)
      : controllerTemplate(name, methods)
    const controllersDir = path.join(path.resolve(), './app/controllers')
    fs.writeFileSync(
      path.join(controllersDir, `${name}Controller.js`),
      template
    )

    const routerContent = fs.readFileSync(routerPath, { encoding: 'utf-8'})
    const linedContent = routerContent.split('\n')

    const lastImportRowNum = findLineAfterKeyword(linedContent, 'import')
    linedContent.splice(
      lastImportRowNum,
      0,
      `import { ${capitalize(name)}Controller } from "../app/controllers/${name}Controller.js"`
    )

    const lastRegisteredRowNum = findLineAfterKeyword(linedContent, 'app.use')
    linedContent.splice(
      lastRegisteredRowNum,
      0,
      `  app.use('/${name.toLocaleLowerCase()}',${protectedRoute ? ' ensureAuthenticated, ': ''} new ${capitalize(name)}Controller().router)`
    )

    const updatedContent = linedContent.join('\n')
    fs.writeFileSync(
      routerPath,
      updatedContent
    )
}