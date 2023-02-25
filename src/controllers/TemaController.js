import service from '../services/ServiceTema'

class TemaController {
  async index (req, res) {
    try {
      const temas = await service.index()
      return res.status(200).render('layout-tema', { temas, page: 'tema' })
    } catch (err) { console.log(err) }
  }

  async getList (req, res) {
    try {
      const temas = await service.getList()
      return res.status(200).render('./partials/temas/tema-partials/savedTemas', { temas })
    } catch (err) { console.log(err) }
  }

  async getOne (req, res) {
    const { id } = req.params
    try {
      const temas = await service.getOne(id)
      return res.status(200).render('./partials/temas/tema-partials/bellows', { temas: [temas] })
    } catch (err) { console.log(err) }
  }

  async getAll (req, res) {
    try {
      const temas = await service.index()
      return res.status(200).render('./partials/temas/tema-partials/bellows', { temas })
    } catch (err) { console.log(err) }
  }

  async getType (req, res) {
    const { _type } = req.params
    try {
      const temas = await service.getType(_type)
      return res.status(200).render('./partials/temas/tema-partials/bellows', { temas })
    } catch (err) { console.log(err) }
  }

  async getJuizo (req, res) {
    const { juizo } = req.params
    try {
      const temas = await service.getJuizo(juizo)
      return res.status(200).render('./partials/temas/tema-partials/bellows', { temas })
    } catch (err) { console.log(err) }
  }

  async create (req, res) {
    const { description, name, content, juizo, _type } = req.body.data
    try {
      const response = await service.create(description, name, content, juizo, _type)
      return res.status(200).json(response)
    } catch (err) {
      console.log(err)
    }
  }

  async update (req, res) {
    const { name, juizo, _type } = req.body
    const { id } = req.params
    try {
      const tema = await service.update(id, name, juizo, _type)
      if (tema) {
        return res.status(200).json('success')
      }
      return res.status(400).json('error updating')
    } catch (err) {
      console.log(err)
    }
  }

  async delete (req, res) {
    const { id } = req.params
    try {
      const tema = await service.delete(id)
      if (tema) {
        return res.status(200).json('success')
      }
      return res.status(400).json('error deleting')
    } catch (e) { console.log(e) }
  }
}

export default new TemaController()
