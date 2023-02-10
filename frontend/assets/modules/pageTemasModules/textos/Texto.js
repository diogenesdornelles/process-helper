import tema from '../temas/Tema'

class Texto {
  validate () {
    this.description = document.querySelector('#new-texto-description')
    this.content = document.querySelector('#new-texto-content')
    if (this.description.value && this.content.value) {
      return true
    }
    alert('Fornecer dados de todos os campos!')
    return false
  }

  async save (id) {
    try {
      this._csrf_3 = document.querySelector('#_third-csrf')
      // eslint-disable-next-line no-undef
      const response = await axios.post('/texto', {
        _csrf: this._csrf_3.value,
        description: this.description.value,
        content: this.content.value,
        id
      })
      if (response.status < 300) {
        const data = await tema.getAll()
        return data
      }
    } catch (e) {
      console.log(e)
    }
  }

  async show (sample, juizo, _type) {
    try {
      // eslint-disable-next-line no-undef
      const response = await axios.get(`/texto/${sample}/${juizo}/${_type}`)
      if (response.status < 300) {
        return response.data
      } else {
        return false
      }
    } catch (e) {
      console.log(e)
      return false
    }
  }

  async update (textoId, temaId) {
    try {
      this.description = document.querySelector(`INPUT[texto-id="${textoId}"]`)
      this.content = document.querySelector(`TEXTAREA[texto-id="${textoId}"]`)
      this._csrf_3 = document.querySelector('#_third-csrf')
      if (this.description && this.content) {
        // eslint-disable-next-line no-undef
        const response = await axios.put(`/texto/${textoId}`, {
          _csrf: this._csrf_3.value,
          description: this.description.value,
          content: this.content.value,
          tema_id: temaId
        })
        if (response.status < 300) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    } catch (e) {
      console.log(e)
    }
  }

  async delete (id) {
    const _csrf = document.querySelector('#_third-csrf').value
    try {
      // eslint-disable-next-line no-undef
      const response = await axios.delete(`/texto/${id}`, {
        data: {
          _csrf
        },
        headers: {
          'X-CSRFToken': _csrf
        },
        withCredentials: true
      }
      )
      if (response.status < 300) {
        return true
      } else {
        return false
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export default new Texto()
