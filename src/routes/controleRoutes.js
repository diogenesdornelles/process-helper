import { Router } from 'express'
import ControleController from '../controllers/ControleController'
// import loginIsRequired from '../middlewares/loginIsRequired'

const router = new Router()

router.get('/', ControleController.index)

export default router
