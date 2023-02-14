import express from 'express'
import { middlewareGlobal, checkCsrfError, csrfMiddleware } from './src/middlewares/middleware'

import path from 'path'
// For security application
// import helmet from 'helmet'
import csrf from 'csurf'
import homeRoutes from './src/routes/homeRoutes'
import tableRoutes from './src/routes/tableRoutes'
import processoRoutes from './src/routes/processoRoutes'
import controleRoutes from './src/routes/controleRoutes'
import temaRoutes from './src/routes/temaRoutes'
import textoRoutes from './src/routes/textoRoutes'
import mediaLogRoutes from './src/routes/mediaLogRoutes'
import chemistriesRoutes from './src/routes/chemistriesRoutes'
import sessionOptions from './src/configs/db.config'

class App {
  constructor () {
    this.app = express()
    this.middlewares()
    this.routes()
    this.views()
  }

  views () {
    this.app.set('views', path.resolve(__dirname, 'src', 'views'))
    this.app.set('view engine', 'ejs')
  }

  middlewares () {
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())
    this.app.use(express.static(path.resolve(__dirname, 'public')))
    this.app.use(sessionOptions)
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())
    this.app.use(csrf())
    // app.use(helmet());
    this.app.use(middlewareGlobal)
    this.app.use(checkCsrfError)
    this.app.use(csrfMiddleware)
  }

  routes () {
    this.app.use('/', homeRoutes)
    this.app.use('/controle/', controleRoutes)
    this.app.use('/table/', tableRoutes)
    this.app.use('/processo/', processoRoutes)
    this.app.use('/tema/', temaRoutes)
    this.app.use('/texto/', textoRoutes)
    this.app.use('/media-logaritmica/', mediaLogRoutes)
    this.app.use('/quimicos/', chemistriesRoutes)
  }
}

const app = new App()
export default app.app
