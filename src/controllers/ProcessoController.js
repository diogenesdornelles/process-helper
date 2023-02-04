import service from '../services/ServiceProcesso'

class ProcessoController {
  async create (req, res) {
    try {
      const { id } = req.params
      const { numero, cls, juizo, localizador, dias, assunto, sigla, status, comentario } = req.body.data
      const createdProcesso = await service.create(id, numero, cls, juizo, localizador, dias, assunto, sigla, status, comentario)
      if (createdProcesso) {
        return res.status(200).send(createdProcesso)
      } else {
        return res.status(400).json('error creating')
      }
    } catch (e) { console.log(e) }
  }

  async show (req, res) {
    const { id, tablenum, sigla, status, numero } = req.params
    try {
      const processos = await service.show(id, sigla, status, numero)
      return res.status(200).render('./partials/controle/table', {
        processos,
        tablenum,
        id
      })
    } catch (e) { console.log(e) }
  }

  async update_sigla (req, res) {
    const { id } = req.params
    const { value } = req.body
    try {
      const processo = await service.update_sigla(id, value)
      if (processo) {
        return res.status(200).json('success')
      } else {
        return res.status(400).json('error updating')
      }
    } catch (e) { console.log(e) }
  }

  async update_status (req, res) {
    const { id } = req.params
    const { value } = req.body
    try {
      const processo = await service.update_status(id, value)
      if (processo) {
        return res.status(200).json('success')
      } else {
        return res.status(400).json('error updating')
      }
    } catch (e) { console.log(e) }
  }

  async update_comentario (req, res) {
    const { id } = req.params
    const { value } = req.body
    try {
      const processo = await service.update_comentario(id, value)
      if (processo) {
        return res.status(200).json('success')
      } else {
        return res.status(400).json('error updating')
      }
    } catch (e) { console.log(e) }
  }

  async delete (req, res) {
    const { id } = req.params
    try {
      const processo = await service.delete(id)
      if (processo) {
        return res.status(200).json('success')
      } else {
        return res.status(400).json('error deleting')
      }
    } catch (e) { console.log(e) }
  }
}

export default new ProcessoController()
