import addChart from './addChart'
import addObserverTr from './addObserverTr'
import fieldsAddListeners from './fieldsAddListeners'
import setBtnDelTable from './setBtnDelTable'
import textareaAutoExpand from '../textarea/textareaAutoExpand'
import copyProcessNumber from './copyProcessNumber'

export default class Table {
  constructor () {
    this._csrf_1 = document.getElementById('_first-csrf')
    this.id = document.querySelector('#table_id')
    this._csrf_2 = document.querySelector('#_second-csrf')
    this.repository = []
  }

  async save () {
    try {
      // eslint-disable-next-line no-undef
      const response = await axios.post('/table', {
        _csrf: this._csrf_1.value,
        data: this.repository
      })
      if (response.data === 'success') {
        window.location.assign('/controle')
        alert('Planilha salva com sucesso!')
      }
    } catch (e) {
      console.log(e)
    }
  }

  async delete () {
    try {
      // eslint-disable-next-line no-undef
      const response = await axios.delete(`/table/${this.id.value}`, {
        data: {
          _csrf: this._csrf_2.value
        },
        headers: {
          'X-CSRFToken': this._csrf_2.value
        },
        withCredentials: true
      }
      )
      if (response.status < 300) {
        alert('Tabela excluída!')
        window.location.assign('/controle')
        document.getElementById('table-container').innerHTML = ''
        document.querySelector('#alert-exclude-table').removeAttribute('style')
      }
    } catch (e) {
      console.log(e)
    }
  }

  tableInit () {
    fieldsAddListeners()
    addObserverTr()
    setBtnDelTable()
    addChart()
    textareaAutoExpand()
    copyProcessNumber()
  }

  async get (id, num) {
    try {
      // eslint-disable-next-line no-undef
      const response = await axios.get(`/table/${id}/${num}`)
      document.getElementById('table-container').innerHTML = response.data
      this.tableInit()
    } catch (e) { console.log(e) }
  }
}
