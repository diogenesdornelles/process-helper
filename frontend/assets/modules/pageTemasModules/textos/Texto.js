import tema from '../temas/Tema'
import moment from 'moment'
moment().format('L')
moment.locale('pt-br')

class Texto {
  setData () {
    this.description = document.querySelector('#new-texto-description')
    this.content = document.querySelector('#new-texto-content')
    this.timeFrameOptions = document.querySelectorAll('.checkbox-time-frame')
    this.datesRange = []
  }

  validate (type) {
    this.setData()
    if (type === 'tempo_especial') {
      this.timeFrameOptions.forEach(option => {
        if (option.checked) {
          this.datesRange.push(option.value.split(','))
        }
      })
    }
    this.datesRange = this.datesRange.flat()
    if (this.datesRange.length < 1) {
      return false
    }
    this.datesRangeNormalized = this.datesRange.map(date => {
      return date !== 'current' ? moment(date, 'DD-MM-YYYY') : 'current'
    })

    if (this.description.value && this.content.value) {
      return true
    }
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
        id,
        duration: this.datesRangeNormalized ? this.datesRangeNormalized : null
      })
      if (response.status < 300) {
        const data = await tema.getAll()
        return data
      }
    } catch (e) {
      console.log(e)
    }
  }

  async show (sample, juizo, _type, tema) {
    try {
      // eslint-disable-next-line no-undef
      const response = await axios.get(`/texto/${sample}/${juizo}/${_type}/${tema}`)
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
