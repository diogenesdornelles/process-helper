import { Router } from 'express'
import TableController from '../controllers/TableController'
import { isValidReqShowTable, isValidReqDeleteTable } from '../middlewares/middleware'

const router = new Router()

router.post('/', TableController.create)

router.get('/:id/:tablenum', isValidReqShowTable, TableController.show)

router.delete('/:id', isValidReqDeleteTable, TableController.delete)

export default router
