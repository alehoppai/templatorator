import fs from "node:fs"
import path from "node:path"

/**
 * Capitalizing any word, not whole sentence
 * @param {string} str 
 * @returns {string}
 */
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Should used for split by \n file content.
 * looking for a next line index below last match of 
 * given keyword.
 * @param {string[]} lines 
 * @param {string} keyword 
 * @returns {number}
 */
function findLineAfterKeyword(lines, keyword) {
  let lastKeywordIndex = -1

  lines.forEach((line, index) => {
    if (line.includes(keyword)) {
      lastKeywordIndex = index
    }
  });

  return lastKeywordIndex !== -1 && lastKeywordIndex + 1 < lines.length 
    ? lastKeywordIndex + 1
    : -1
}

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

const [what, ...rest] = process.argv.slice(2)


switch(what) {
  case "controller":
  case "c": {
    const [name, ...methods] = rest
    const routerPath = path.join(path.resolve(), 'app/router.js')
    const template = controllerTemplate(name, methods)
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
      `import { ${capitalize(name)}Controller } from "./controllers/${name}Controller.js"`
    )

    const lastRegisteredRowNum = findLineAfterKeyword(linedContent, 'r.use')
    linedContent.splice(
      lastRegisteredRowNum,
      0,
      `r.use(new ${capitalize(name)}Controller().router)`
    )

    const updatedContent = linedContent.join('\n')
    fs.writeFileSync(
      routerPath,
      updatedContent
    )
    break
  }
  default: break
}