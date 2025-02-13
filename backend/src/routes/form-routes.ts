import { FormController } from '@/controllers/form-Controller'
import { Router } from 'express'

const formRoutes = Router()
const formController = new FormController()

formRoutes.post('/', formController.create)
formRoutes.get('/', formController.index)

export { formRoutes }