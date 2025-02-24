import express from 'express'
import { FormController } from '../controller/Form-controller'

const formRoutes = (database: any) => {
  const router = express.Router()
  const formController = new FormController(database)

  router.get('/', async (req, res) => {
    return formController.index(req, res)
  })

  router.post('/', async (req, res) => {
    return formController.create(req, res)
  })
  
  router.delete('/:id', async (req, res) => {
    return formController.delete(req, res)
  })

  return router
}

export default formRoutes
