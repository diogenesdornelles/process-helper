import moment from 'moment'
moment().format('L')
moment.locale('pt-br')

exports.middlewareGlobal = (req, res, next) => {
  res.locals.moment = moment
  res.locals.currentDate = moment().format('L')
  next()
}

exports.checkCsrfError = (err, req, res, next) => {
  if (err) {
    console.log(err)
    return res.render('404')
  }
}

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken()
  next()
}

exports.isValidReqCreateProcesso = (req, res, next) => {
  const { id } = req.params
  const { numero, cls, juizo, localizador, dias, assunto, sigla, status, comentario } = req.body.data
  if (numero && cls && juizo && localizador && dias && assunto && sigla && status && comentario && id) {
    next()
  } else {
    res.status(400).json({ error: 'Dados completos devem ser enviados' })
  }
}

exports.isValidReqShowProcesso = (req, res, next) => {
  const { id, tablenum } = req.params
  if (id && tablenum) {
    next()
  } else {
    res.status(400).json({ error: 'Dados completos devem ser enviados' })
  }
}

exports.isValidReqUpdateProcesso = (req, res, next) => {
  const { id } = req.params
  const { value } = req.body
  if (id && value) {
    next()
  } else {
    res.status(400).json({ error: 'Dados completos devem ser enviados' })
  }
}

exports.isValidReqDeleteProcesso = (req, res, next) => {
  const { id } = req.params
  if (id) {
    next()
  } else {
    res.status(400).json({ error: 'Dados completos devem ser enviados' })
  }
}

exports.isValidReqShowTable = (req, res, next) => {
  const { id, tablenum } = req.params
  if (id && tablenum) {
    next()
  } else {
    res.status(400).json({ error: 'Dados completos devem ser enviados' })
  }
}

exports.isValidReqDeleteTable = (req, res, next) => {
  const { id } = req.params
  if (id) {
    next()
  } else {
    res.status(400).json({ error: 'Dados completos devem ser enviados' })
  }
}

exports.isValidReqGetOneTema = (req, res, next) => {
  const { id } = req.params
  if (id) {
    next()
  } else {
    res.status(400).json({ error: 'Dados completos devem ser enviados' })
  }
}

exports.isValidReqCreateTema = (req, res, next) => {
  const { description, name, content } = req.body.data
  if (description && name && content) {
    next()
  } else {
    res.status(400).json({ error: 'Dados completos devem ser enviados' })
  }
}

exports.isValidReqUpdateTema = (req, res, next) => {
  const { name } = req.body
  const { id } = req.params
  if (name && id) {
    next()
  } else {
    res.status(400).json({ error: 'Dados completos devem ser enviados' })
  }
}

exports.isValidReqDeleteTema = (req, res, next) => {
  const { id } = req.params
  if (id) {
    next()
  } else {
    res.status(400).json({ error: 'Dados completos devem ser enviados' })
  }
}

exports.isValidReqGetTypeTema = (req, res, next) => {
  const { _type } = req.params
  if (_type) {
    next()
  } else {
    res.status(400).json({ error: 'Dados completos devem ser enviados' })
  }
}

exports.isValidReqGetJuizoTema = (req, res, next) => {
  const { juizo } = req.params
  if (juizo) {
    next()
  } else {
    res.status(400).json({ error: 'Dados completos devem ser enviados' })
  }
}

exports.isValidReqCreateTexto = (req, res, next) => {
  const { description, content, id } = req.body
  if (description && id && content) {
    next()
  } else {
    res.status(400).json({ error: 'Dados completos devem ser enviados' })
  }
}

exports.isValidReqUpdateTexto = (req, res, next) => {
  // eslint-disable-next-line camelcase
  const { description, content, tema_id } = req.body
  // eslint-disable-next-line camelcase
  if (description && content && tema_id) {
    next()
  } else {
    res.status(400).json({ error: 'Dados completos devem ser enviados' })
  }
}

exports.isValidReqDeleteTexto = (req, res, next) => {
  const { id } = req.params
  if (id) {
    next()
  } else {
    res.status(400).json({ error: 'Dados completos devem ser enviados' })
  }
}
