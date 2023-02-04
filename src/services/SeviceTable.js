import Processo from '../models/ProcessoModel'
import Table from '../models/TableModel'

class ServiceTable {
  async create (data) {
    try {
      const table = await Table.create({})
      data.forEach(async row => {
        const { numero, cls, juizo, localizador, dias, assunto, sigla, status, comentario } = row
        try {
          const processo = await Processo.create({ numero, cls, juizo, localizador, dias, assunto, sigla, status, table_id: table._id, comentario })
          await Table.findByIdAndUpdate(table._id, {
            $push: {
              processos: processo._id
            }
          })
        } catch (err) {
          console.log(err)
        }
      })
      return table
    } catch (err) { console.log(err) }
  }

  async show (id) {
    try {
      const processos = await Processo.find({
        table_id: id
      })
      return processos
    } catch (err) { console.log(err) }
  }

  async delete (id) {
    try {
      let table = await Table.findById(id)
      table.processos.forEach(async _id => {
        await Processo.findByIdAndDelete(_id)
      })
      table = await Table.findByIdAndDelete(id)
      return table
    } catch (e) { console.log(e) }
  }
}

export default new ServiceTable()
