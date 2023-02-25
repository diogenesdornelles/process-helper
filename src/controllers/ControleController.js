import service from '../services/ServiceControle'

class ControleController {
  async index (req, res) {
    try {
      const tables = await service.index()
      return res.status(200).render('layout-controle', { tables, page: 'controle' })
    } catch (err) { console.log(err) }
  }
}

export default new ControleController()
