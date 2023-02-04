import Table from '../models/TableModel'

class ServiceControle {
  async index () {
    try {
      const tables = await Table.find({}).sort({ numero: -1 })
      return tables
    } catch (err) { console.log(err) }
  }
}

export default new ServiceControle()
