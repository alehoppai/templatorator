import { IndexController } from "../app/controllers/indexController.js";

export function enableRoutes(app) {
  app.use('/', new IndexController().router)
}


