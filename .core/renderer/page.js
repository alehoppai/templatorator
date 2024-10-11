/** @type {import("./page").MetaFn} */
const meta = ({ name, content, charset }) => `<meta ${charset ? `charset="${charset}"` : ''} ${name ? `name="${name}"` : ''} ${content ? `content="${content}"` : ''} />`

/** @type {import("./page").LinkFn} */
const link = ({rel, href}) => (!rel || !href) ? "link's rel & href both required" : `<link rel="${rel}" href="${href}" />`

/** @type {import("./page").PageFn} */
export const page = ({
  lang = "en",
  metas = [],
  links = [],
  title = "Index page",
  htmlClass = "",
  bodyClass = "",
  children = [],
}) => `
<DOCTYPE! html>
<html lang="${lang}"${!!htmlClass ? ` class="${htmlClass}"` : ''}>
  <head>
    ${metas.map(m => meta(m))}
    ${links.map(l => link(l))}
    <title>${title}</title>
  </head>
  <body${!!bodyClass ? ` class="${bodyClass}"` : ''}>
    ${children.map(c => c.body())}
  </body>
</html>
`
