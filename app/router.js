import { Router } from "express";
import { IndexController } from "./controllers/indexController.js";

const r = Router()
r.use(new IndexController().router)

export default r
