import moment from 'moment'

class Tema {
  setData () {
    this.name = document.querySelector('#new-tema-name')
    this.description = document.querySelector('#new-tema-texto-description')
    this.content = document.querySelector('#new-tema-texto-content')
    this.juizo = document.querySelector('#new-tema-juizo')
    this.type = document.querySelector('#new-tema-texto-type')
    this.timeFrameOptions = document.querySelectorAll('.time-frame-tse-option')
    this._csrf_3 = document.querySelector('#_third-csrf')
    this.datesRange = []
    this.data = {}
  }

  validate () {
    this.setData()
    if (this.type.value === 'tempo_especial') {
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
      return date !== 'current' ? moment(date) : 'current'
    })
    if (this.name.value && this.description.value && this.content.value) {
      this.data = {
        name: this.name.value,
        description: this.description.value,
        content: this.content.value,
        juizo: this.juizo.value,
        _type: this.type.value,
        duration: this.datesRangeNormalized ? this.datesRangeNormalized : null
      }
      return true
    }
    return false
  }

  async getList () {
    try {
      // eslint-disable-next-line no-undef
      const response = await axios.get('/tema/getlist/')
      if (response.status < 300) {
        return response.data
      }
    } catch (e) { console.log(e) }
  }

  async getOne (temaId) {
    try {
      // eslint-disable-next-line no-undef
      const response = await axios.get(`/tema/getone/${temaId}`)
      if (response.status < 300) {
        return response.data
      }
    } catch (e) { console.log(e) }
  }

  async getType (url) {
    try {
      const type = url.split('/').splice(-1)[0]
      // eslint-disable-next-line no-undef
      const response = await axios.get(`/tema/gettype/${type}`)
      if (response.status < 300) {
        return response.data
      }
    } catch (e) { console.log(e) }
  }

  async getJuizo (url) {
    try {
      const juizo = url.split('/').splice(-1)[0]
      // eslint-disable-next-line no-undef
      const response = await axios.get(`/tema/getjuizo/${juizo}`)
      if (response.status < 300) {
        return response.data
      }
    } catch (e) { console.log(e) }
  }

  async getAll () {
    try {
      // eslint-disable-next-line no-undef
      const response = await axios.get('/tema/getall')
      if (response.status < 300) {
        return response.data
      }
    } catch (e) { console.log(e) }
  }

  async save () {
    try {
      // eslint-disable-next-line no-undef
      const response = await axios.post('/tema', {
        _csrf: this._csrf_3.value,
        data: this.data
      })
      if (response.status < 300) {
        return response.data
      }
    } catch (e) {
      console.log(e)
    }
  }

  async update (temaId) {
    try {
      this.name = document.querySelector(`#tema-input-${temaId}`)
      this._type = document.querySelector(`#tema-select-type-${temaId}`)
      this.juizo = document.querySelector(`#tema-select-juizo-${temaId}`)
      this._csrf_3 = document.querySelector('#_third-csrf')
      if (this.name.value) {
        // eslint-disable-next-line no-undef
        const response = await axios.put(`/tema/${temaId}`, {
          _csrf: this._csrf_3.value,
          name: this.name.value,
          juizo: this.juizo.value,
          _type: this._type.value
        })
        if (response.status < 300) {
          const data = await this.getAll()
          return data
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
      const response = await axios.delete(`/tema/${id}`, {
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
        return response.data
      } else {
        return false
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export default new Tema()
