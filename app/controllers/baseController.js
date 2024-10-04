import { Router } from 'express'

export class BaseController {
  router = Router()

  constructor(routes) {
    for (const [method, path, handler] of routes) {
      console.log(method, path, handler)
      this.router[method.trim().toLowerCase()](path, this[handler].bind(this))
    }
  }
}