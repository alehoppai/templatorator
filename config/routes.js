import { ensureAuthenticated } from "../app/utils/ensureAuthenticated.js";
import { IndexController } from "../app/controllers/indexController.js";
import { AuthController } from "../app/controllers/authController.js"

export function enableRoutes(app) {
  app.use('/', new IndexController().router)
  app.use('/auth',  new AuthController().router)
}
