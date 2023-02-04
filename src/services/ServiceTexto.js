import Tema from '../models/TemaModel'
import Texto from '../models/TextoModel'
import Fuse from 'fuse.js'

const FUSE_OPTIONS = {
  isCaseSensitive: false,
  includeMatches: true,
  includeScore: true,
  shouldSort: true,
  threshold: 0.6,
  ignoreLocation: true
}

class ServiceTexto {
  async create (id, description, content) {
    try {
      const texto = await Texto.create({
        description,
        content,
        tema_id: id
      })
      await Tema.findOneAndUpdate(
        {
          _id: id
        }, {
          $push: {
            textos: texto._id
          }
        })
      return texto
    } catch (err) {
      console.log(err)
    }
  }

  async show (sample, juizo, _type) {
    try {
      const query = await Tema.find({ juizo, _type }).populate('textos').select({ content: 1 })
      const textos = query.map(item => item.textos)
      const contents = []
      for (let item = 0; item < textos.length; item++) {
        for (let i = 0; i < textos[item].length; i++) {
          contents.push(textos[item][i].content)
        }
      }
      const fuse = new Fuse(contents, FUSE_OPTIONS)
      let results
      results = fuse.search(sample)
      results = results.map(result => {
        const data = { content: result.item, score: (result.score * 100).toFixed(2) }
        return data
      })
      return results
    } catch (err) { console.log(err) }
  }

  // eslint-disable-next-line camelcase
  async update (id, description, content, tema_id) {
    // eslint-disable-next-line camelcase
    try {
      const texto = await Texto.findOneAndUpdate({
        _id: id,
        // eslint-disable-next-line camelcase
        tema_id
      }, {
        description,
        content
      })
      return texto
    } catch (err) {
      console.log(err)
    }
  }

  async delete (id) {
    try {
      const texto = await Texto.findByIdAndDelete(id)
      return texto
    } catch (e) { console.log(e) }
  }
}

export default new ServiceTexto()
