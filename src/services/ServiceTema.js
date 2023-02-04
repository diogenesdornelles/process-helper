import Tema from '../models/TemaModel'
import Texto from '../models/TextoModel'

class ServiceTema {
  async index () {
    try {
      const temas = await Tema.find({}).populate('textos')
      return temas
    } catch (err) { console.log(err) }
  }

  async getList (req, res) {
    try {
      const temas = await Tema.find({})
      return temas
    } catch (err) { console.log(err) }
  }

  async getOne (id) {
    try {
      const temas = await Tema.findById(id).populate('textos')
      return temas
    } catch (err) { console.log(err) }
  }

  async getType (_type) {
    try {
      const temas = await Tema.find({ _type }).populate('textos')
      return temas
    } catch (err) { console.log(err) }
  }

  async getJuizo (juizo) {
    try {
      const temas = await Tema.find({ juizo }).populate('textos')
      return temas
    } catch (err) { console.log(err) }
  }

  async create (description, name, content, juizo, _type) {
    try {
      const tema = await Tema.create({
        name,
        juizo,
        _type
      })
      const texto = await Texto.create({
        description,
        content,
        tema_id: tema.id
      })
      await Tema.findByIdAndUpdate(tema._id, {
        $push: {
          textos: texto._id
        }
      })
      return 'success'
    } catch (err) {
      if (err.code === 11000) {
        if ('name' in err.keyPattern) {
          return { error: 'Texto já consta inserido no sistema' }
        }
      }
      console.log(err)
    }
  }

  async update (id, name, juizo, _type) {
    try {
      const tema = await Tema.findOneAndUpdate({
        _id: id
      }, {
        name,
        juizo,
        _type
      })
      return tema
    } catch (err) {
      console.log(err)
    }
  }

  async delete (id) {
    try {
      let tema
      tema = await Tema.findById(id)
      tema.textos.forEach(async _id => {
        await Texto.findByIdAndDelete(_id)
      })
      tema = await Tema.findByIdAndDelete(id)
      return tema
    } catch (e) { console.log(e) }
  }
}

export default new ServiceTema()
