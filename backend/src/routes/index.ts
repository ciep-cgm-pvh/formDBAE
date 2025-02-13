import { Router } from "express";
import { formRoutes } from "./form-routes";

const routes = Router()

routes.use('/form', formRoutes)

export { routes }