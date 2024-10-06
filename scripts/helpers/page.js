import path from "node:path";
import fs from "node:fs"

import { capitalize } from "./utils.js";
import { generateController } from "./controller.js";

const layoutTemplate = () => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/assets/styles.css">
  <title><%= it.title %></title>
</head>
<body>
  <%~ it.body %>
</body>
</html>
`

const pageTemplate = (name) => `
<% layout("layouts/${name}") %>

<h1 class="text-xl underline">${capitalize(name)} page</h1>
`

/**
 * Generates page. Its controller with mapped index route.
 * Mapping to base route with given name.
 * @param {string} name 
 * @param {boolean} protectedRoute
 */
export function generatePage(name, protectedRoute = false) {
  const trueName = name.trim().toLowerCase()

  generateController(trueName, [], true, protectedRoute)
  const layoutsDir = path.join(path.resolve(), 'app/views/layouts')
  const pagesDir = path.join(path.resolve(), 'app/views/pages')

  fs.writeFileSync(
    path.join(layoutsDir, `${trueName}.eta`),
    layoutTemplate()
  )
  fs.writeFileSync(
    path.join(pagesDir, `${trueName}.eta`),
    pageTemplate(trueName)
  )
}