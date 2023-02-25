import service from '../services/ServiceTexto'

class TextoController {
  async create (req, res) {
    const { id, description, content, juizo, _type } = req.body
    try {
      const texto = await service.create(id, description, content, juizo, _type)
      if (texto) {
        return res.status(200).json('success')
      }
      return res.status(400).json('error')
    } catch (err) {
      console.log(err)
    }
  }

  async show (req, res) {
    const { sample, juizo, _type } = req.params
    try {
      const results = await service.show(sample, juizo, _type)
      if (results) {
        return res.status(200).render('./partials/temas/tema-partials/searchResult', { results })
      }
      return res.status(400).json('error')
    } catch (err) {
      console.log(err)
    }
  }

  async update (req, res) {
    // eslint-disable-next-line camelcase
    const { description, content, tema_id } = req.body
    const { id } = req.params
    try {
      const texto = service.update(id, description, content, tema_id)
      if (texto) {
        return res.status(200).json('success')
      }
      return res.status(400).json('error')
    } catch (err) {
      console.log(err)
    }
  }

  async delete (req, res) {
    const { id } = req.params
    try {
      const texto = await service.delete(id)
      if (texto) {
        return res.status(200).json('success')
      }
      return res.status(400).json('error')
    } catch (e) { console.log(e) }
  }
}

export default new TextoController()
