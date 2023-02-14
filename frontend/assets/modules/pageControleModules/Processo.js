import addObserverTr from './addObserverTr'
import fieldsAddListeners from './fieldsAddListeners'
import setBtnDelTable from './setBtnDelTable'
import updateTable from './updateTable'

export default class Processo {
  constructor (juizo, assunto, cls, localizador, dias, numero) {
    this.data = []
    this.regexN = /^[0-9]{7}-[0-9]{2}\.[0-9]{4}\.[0-9]\.[0-9]{2}\.[0-9]{4}$/
    this.regexDBr = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/
    this.juizo = juizo || 'Não informado'
    this.assunto = assunto || 'Não informado'
    this.cls = cls
    this.localizador = localizador || 'Não informado'
    this.dias = dias || 1
    this.numero = numero
    this.sigla = 'nao_atribuido'
    this.status = 'sem_analise'
    this.comentario = ' '
    this._csrf_2 = document.querySelector('#_second-csrf')
  }

  validate () {
    const check = this.cls && this.numero
    if (!check) {
      return false
    } else if (!this.regexN.test(this.numero)) {
      return false
    } else if (!this.regexDBr.test(this.cls)) {
      return false
    }
    this.cls = new Date(`${this.cls.slice(-4)}-${this.cls.slice(3, 5)}-${this.cls.slice(0, 2)}T00:00`)
    this.data = { juizo: this.juizo, assunto: this.assunto, cls: this.cls, localizador: this.localizador, dias: this.dias, numero: this.numero, sigla: this.sigla, status: this.status, comentario: this.comentario }
    return true
  }

  async save (id) {
    try {
      // eslint-disable-next-line no-undef
      const response = await axios.post(`/processo/${id}`, {
        _csrf: this._csrf_2.value,
        data: this.data
      })
      if (response.data === 'success') {
        updateTable()
        alert('Processo salvo com sucesso!')
      }
    } catch (e) {
      console.log(e)
    }
  }

  static async show () {
    let tableId
    const buscaNumero = document.querySelector('#table-search-processo')
    const buscaSigla = document.querySelector('#table-search-sigla')
    const buscaStatus = document.querySelector('#table-search-status')
    const num = document.querySelector('#my-table').getAttribute('table-num')
    if (document.querySelector('#table_id')) {
      tableId = document.querySelector('#table_id').value
    } else {
      buscaNumero.value = ''
      alert('Necessário carregar uma tabela antes!')
    }
    if (buscaSigla.value === 'todos' || buscaStatus.value === 'todos') {
      updateTable()
    }
    try {
      // eslint-disable-next-line no-undef
      const response = await axios.get(`/processo/numero/${tableId}/${num}/${buscaSigla.value}/${buscaStatus.value}/${buscaNumero.value}`)
      if (response.status < 300) {
        document.getElementById('table-container').innerHTML = response.data
        fieldsAddListeners()
        addObserverTr()
        setBtnDelTable()
      }
    } catch (e) { console.log(e) }
  }

  static async updateSigla (el) {
    const id = el.getAttribute('id')
    const value = el.value
    const _csrf = document.getElementById('_second-csrf').value
    try {
      // eslint-disable-next-line no-undef
      const response = await axios.put(`/processo/sigla/${id}`, {
        _csrf,
        value
      })
      if (response.status < 300) {
        alert('Sigla atualizada!')
        // updateTable()
      }
    } catch (e) {
      console.log(e)
    }
  }

  static async updateStatus (el) {
    const id = el.getAttribute('id')
    const value = el.value
    const _csrf = document.getElementById('_second-csrf').value
    try {
      // eslint-disable-next-line no-undef
      const response = await axios.put(`/processo/status/${id}`, {
        _csrf,
        value
      })
      if (response.status < 300) {
        alert('Status atualizado!')
        updateTable()
      }
    } catch (e) {
      console.log(e)
    }
  }

  static async updateComentario (el) {
    try {
      const id = el.getAttribute('id')
      const value = document.querySelector(`#comentario-${id}`).value
      const _csrf = document.getElementById('_second-csrf').value
      // eslint-disable-next-line no-undef
      const response = await axios.put(`/processo/comentario/${id}`, {
        _csrf,
        value
      })
      if (response.status < 300) {
        alert('Comentario inserido!')
        // updateTable()
      }
    } catch (e) {
      console.log(e)
    }
  }

  static async delete (el) {
    const id = el.getAttribute('id')
    const _csrf = document.getElementById('_second-csrf').value
    try {
      // eslint-disable-next-line no-undef
      const response = await axios.delete(`/processo/${id}`, {
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
        alert('Processo deletado!')
        // updateTable()
        const tr = el.parentNode.parentNode
        tr.remove()
      }
    } catch (e) {
      console.log(e)
    }
  }
}
