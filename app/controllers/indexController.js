import { BaseController } from "./baseController.js"

export class IndexController extends BaseController {
  constructor() {
    super([
      ['GET', '/', 'index']
    ])
  }

  /**
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */
  index(req, res) {
    res.render("pages/index", { title: "Landing page" })
  }
}
