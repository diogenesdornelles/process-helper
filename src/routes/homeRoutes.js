import { Router } from 'express'
import HomeController from '../controllers/HomeController'
// import loginIsRequired from '../middlewares/loginIsRequired'

const router = new Router()

router.get('/', HomeController.index)

export default router
