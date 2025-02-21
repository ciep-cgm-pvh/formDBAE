import { Router } from 'express'
import { FormController } from '../controller/Form-Controller'

export const formRoutes = Router()
const formController = new FormController()

formRoutes.get('/', formController.index)
formRoutes.post('/', formController.create)
formRoutes.delete('/:_id', formController.delete)
