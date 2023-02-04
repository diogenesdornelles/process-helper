import Processo from '../models/ProcessoModel'
import Table from '../models/TableModel'

class ServiceProcesso {
  async create (id, numero, cls, juizo, localizador, dias, assunto, sigla, status, comentario) {
    try {
      const processo = await Processo.create({ numero, cls, juizo, localizador, dias, assunto, sigla, status, table_id: id, comentario })
      await Table.findByIdAndUpdate(id, {
        $push: {
          processos: processo._id
        }
      })
    } catch (err) { console.log(err) }
  }

  async show (id, sigla, status, numero) {
    let data
    if (numero) {
      const string = `^${numero}`
      const regexp = new RegExp(string)
      data = { table_id: id, numero: { $regex: regexp }, sigla, status }
    } else {
      data = { table_id: id, sigla, status }
    }
    try {
      const processos = await Processo.find(data)
      return processos
    } catch (e) { console.log(e) }
  }

  async update_sigla (id, value) {
    try {
      const processo = await Processo.findByIdAndUpdate(id, {
        sigla: value
      })
      return processo
    } catch (e) { console.log(e) }
  }

  async update_status (id, value) {
    try {
      const processo = await Processo.findByIdAndUpdate(id, {
        status: value
      })
      return processo
    } catch (e) { console.log(e) }
  }

  async update_comentario (id, value) {
    try {
      const processo = await Processo.findByIdAndUpdate(id, {
        comentario: value
      })
      return processo
    } catch (e) { console.log(e) }
  }

  async delete (id) {
    try {
      const processo = await Processo.findByIdAndDelete(id)
      return processo
    } catch (e) { console.log(e) }
  }
}

export default new ServiceProcesso()
