import { Router } from 'express'
import ProcessoController from '../controllers/ProcessoController'
import { isValidReqCreateProcesso, isValidReqShowProcesso, isValidReqUpdateProcesso, isValidReqDeleteProcesso } from '../middlewares/middleware'

const router = new Router()

router.post('/:id', isValidReqCreateProcesso, ProcessoController.create)

router.get('/numero/:id/:tablenum/:sigla/:status/:numero?', isValidReqShowProcesso, ProcessoController.show)

router.put('/sigla/:id', isValidReqUpdateProcesso, ProcessoController.update_sigla)

router.put('/status/:id', isValidReqUpdateProcesso, ProcessoController.update_status)

router.put('/comentario/:id', isValidReqUpdateProcesso, ProcessoController.update_comentario)

router.delete('/:id', isValidReqDeleteProcesso, ProcessoController.delete)

export default router
