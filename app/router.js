import { Router } from "express";
import { IndexController } from "./controllers/indexController.js";

const r = Router()

const indexController = new IndexController()
r.use(indexController.router)

// <% routes_gen_region %>
// <% end %>

export default r
