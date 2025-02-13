import { Request, Response, NextFunction } from 'express'

class FormController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      return response
        .status(200)
        .json({ message: 'você conseguiu <create>!!!' })
    } catch (error) {
      next(error)
    }
  }
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      return response.status(200).json({ message: 'você conseguiu <index>!!!' })
    } catch (error) {
      next(error)
    }
  }
}

export { FormController }
