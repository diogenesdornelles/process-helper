import { Router } from 'express'
import TextoController from '../controllers/TextoController'
import { isValidReqCreateTexto, isValidReqUpdateTexto, isValidReqDeleteTexto } from '../middlewares/middleware'

const router = new Router()

router.post('/', isValidReqCreateTexto, TextoController.create)

router.get('/:sample/:juizo/:_type/:tema', TextoController.show)

router.put('/:id', isValidReqUpdateTexto, TextoController.update)

router.delete('/:id', isValidReqDeleteTexto, TextoController.delete)

export default router
