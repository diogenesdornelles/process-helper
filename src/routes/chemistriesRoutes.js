import { Router } from 'express'
import ChemistriesController from '../controllers/ChemistriesController'

const router = new Router()

router.get('/', ChemistriesController.index)

export default router
