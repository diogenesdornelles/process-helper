import { Router } from 'express'
import TemaController from '../controllers/TemaController'
import { isValidReqGetOneTema, isValidReqCreateTema, isValidReqUpdateTema, isValidReqDeleteTema, isValidReqGetTypeTema, isValidReqGetJuizoTema } from '../middlewares/middleware'

const router = new Router()

router.get('/', TemaController.index)

router.get('/getall', TemaController.getAll)

router.get('/getlist', TemaController.getList)

router.get('/getone/:id', isValidReqGetOneTema, TemaController.getOne)

router.get('/gettype/:_type', isValidReqGetTypeTema, TemaController.getType)

router.get('/getjuizo/:juizo', isValidReqGetJuizoTema, TemaController.getJuizo)

router.post('/', isValidReqCreateTema, TemaController.create)

router.put('/:id', isValidReqUpdateTema, TemaController.update)

router.delete('/:id', isValidReqDeleteTema, TemaController.delete)

export default router
