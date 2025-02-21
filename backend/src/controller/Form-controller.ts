import type { Request, Response } from 'express'

export class FormController {
  async index(req: Request, res: Response) {
    return res.json({ message: 'Hello World' })
  }
  async create(req: Request, res: Response) {
    return res.json({ message: 'Create' })
  }
}
