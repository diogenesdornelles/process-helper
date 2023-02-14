import { Router } from 'express'
import MediaLogController from '../controllers/MediaLogController'

const router = new Router()

router.get('/', MediaLogController.index)

export default router
