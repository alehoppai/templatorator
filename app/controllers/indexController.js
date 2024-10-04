import { BaseController } from "./baseController.js"

export class IndexController extends BaseController {
  constructor() {
    super([
      ['GET', '/', 'index']
    ])
  }

  index(req, res) {
    res.render("pages/index", { title: "Landing page" })
  }
}
