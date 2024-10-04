import path from "node:path"

import { Eta } from "eta"

const eta = new Eta({
  views: path.join(path.resolve(), "./app/views")
})

function buildEtaEngine() {
  return (path, opts, callback) => {
    try {
      const fileContent = eta.readFile(path);
      const renderedTemplate = eta.renderString(fileContent, opts);
      callback(null, renderedTemplate);
    } catch (error) {
      callback(error);
    };
  };
}

export function enableViews(app) {
  app.engine("eta", buildEtaEngine())
  app.set("view engine", "eta")
  app.set('views', './app/views')
  console.info("CONFIG -- 'eta' view engine [enabled]")
}
