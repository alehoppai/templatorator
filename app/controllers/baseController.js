import { Router } from 'express'

/**
 * Base controller class.
 * local router initialized here
 */
export class BaseController {
  router = Router()

  /**
   * @param {['GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', 'string'][]} routes 
   */
  constructor(routes) {
    for (const [method, path, handler] of routes) {
      this.router[method.trim().toLowerCase()](path, this[handler].bind(this))
    }
  }
}