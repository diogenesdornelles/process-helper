import service from '../services/SeviceTable'

class TableController {
  async create (req, res) {
    const { data } = req.body.data
    try {
      const table = await service.create(data)
      if (table) {
        return res.status(200).json('success')
      } else {
        return res.status(400).json('error creating')
      }
    } catch (err) { console.log(err) }
  }

  async show (req, res) {
    try {
      const { id, tablenum } = req.params
      const processos = await service.show(id)
      return res.status(200).render('./partials/controle/table', {
        processos,
        tablenum
      })
    } catch (err) { console.log(err) }
  }

  async delete (req, res) {
    const { id } = req.params
    try {
      const table = await service.delete(id)
      if (table) {
        return res.status(200).json('success')
      } else {
        return res.status(400).json('error deleting')
      }
    } catch (e) { console.log(e) }
  }
}

export default new TableController()
