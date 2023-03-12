import Tema from '../models/TemaModel'
import Texto from '../models/TextoModel'
import Fuse from 'fuse.js'

const FUSE_OPTIONS = {
  isCaseSensitive: false,
  includeMatches: true,
  includeScore: true,
  shouldSort: true,
  threshold: 0.6,
  ignoreLocation: true,
  keys: [
    {
      name: 'content',
      weight: 0.4
    },
    {
      name: 'description',
      weight: 0.6
    }
  ]
}

class ServiceTexto {
  async create (id, description, content, duration) {
    try {
      const texto = await Texto.create({
        description,
        content,
        tema_id: id,
        duration
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

  async show (sample, juizo, _type, tema) {
    let parameters
    if (tema === 'todos') {
      parameters = {
        juizo,
        _type
      }
    } else {
      parameters = {
        juizo,
        _type,
        name: tema
      }
    }
    try {
      const query = await Tema.find(parameters).populate('textos').select({ content: 1, description: 1 })
      const textos = query.map(item => item.textos)
      const contents = []
      for (let item = 0; item < textos.length; item++) {
        for (let i = 0; i < textos[item].length; i++) {
          contents.push({ content: textos[item][i].content, description: textos[item][i].description })
        }
      }
      if (contents.length > 0) {
        const fuse = new Fuse(contents, FUSE_OPTIONS)
        let results
        results = fuse.search(sample)
        results = results.map(result => {
          const data = { result: result.item, score: (result.score * 100).toFixed(2) }
          return data
        })
        return results
      }
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
