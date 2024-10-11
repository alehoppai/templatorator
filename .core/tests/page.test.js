import assert from "node:assert"
import { page } from "../renderer/page.js";

const p = page({
  metas: [{charset: "UTF-8"}, {name:"viewport", content:"width=device-width, initial-scale=1.0"}],
  links: [{rel: "stylesheet", href: "/assets/styles.css"}],
  title: "First page",
  bodyClass: "bg-gradient-to-tr from-slate-700 to-gray-900 h-screen flex flex-col items-center justify-center",
  children: [{body: () => "CONTENT!"}],
})

console.log(p)

const expect = `
<DOCTYPE! html>
<html lang="en">
  <head>
    <meta charset="UTF-8"   />,<meta  name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/assets/styles.css" />
    <title>First page</title>
  </head>
  <body class="bg-gradient-to-tr from-slate-700 to-gray-900 h-screen flex flex-col items-center justify-center">
    CONTENT!
  </body>
</html>
`

assert.equal(p, expect)
console.info("[TEST] -- page return result -- PASSED")
