import path from "node:path"

export function enableViews(app) {
  app.set("view engine", "pug")
  app.set('views', path.join(path.resolve(), 'app/views'))
  console.info("CONFIG -- 'eta' view engine [enabled]")
}

