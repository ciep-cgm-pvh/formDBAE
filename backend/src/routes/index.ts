import { Router } from 'express'
import { formRoutes } from './form-routes'

export const routes = Router()

routes.use('/form', formRoutes)
