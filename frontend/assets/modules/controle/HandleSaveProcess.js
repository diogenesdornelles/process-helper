import Processo from './Processo'

export default class handleSaveProcess {
  constructor () {
    this.numbers = '0123456789'
  }

  showPainel () {
    document.querySelector('#form-new-process').classList.remove('hidden')
    document.querySelector('#form-new-process').classList.add('flex')
  }

  removePainel () {
    document.querySelector('#form-new-process').classList.add('hidden')
    document.querySelector('#form-new-process').classList.remove('flex')
  }

  validadeFieldNum () {
    this.numero = document.querySelector('#new-process-number')
    this.numero.addEventListener('input', (e) => {
      if (this.numero.value.indexOf(e.data) < 0) {
        this.numero.value = this.numero.value.slice(0, -1)
      }
      if (this.numero.value.length === 26) {
        this.numero.value = this.numero.value.slice(0, -1)
      }
      if (this.numero.value.length < 25) {
        this.addAlert()
      }
      if (this.numbers.includes(e.data) || e.data === 'Backspace') {
        if (this.numero.value.length === 10 || this.numero.value.length === 15 || this.numero.value.length === 17 || this.numero.value.length === 20) {
          this.numero.value += '.'
        }
        if (this.numero.value.length === 7) {
          this.numero.value += '-'
        }
      }
      if (this.numero.value.length === 25) {
        this.removeAlert()
      }
    })
  }

  addAlert () {
    this.numero.classList.add('bg-red-50')
    this.numero.classList.remove('bg-green-50')
  }

  removeAlert () {
    this.numero.classList.remove('bg-red-50')
    this.numero.classList.add('bg-green-50')
  }

  start () {
    if (document.querySelector('#table_id')) {
      this.showPainel()
      this.validadeFieldNum()
      document.querySelector('#submit-new-process').addEventListener('click', () => {
        this.tableId = document.querySelector('#table_id')
        this.juizo = document.querySelector('#new-process-juizo')
        this.assunto = document.querySelector('#new-process-assunto')
        this.localizador = document.querySelector('#new-process-localizador')
        this.cls = document.querySelector('#new-process-cls')
        const processo = new Processo(this.juizo.value, this.assunto.value, this.cls.value, this.localizador.value, 1, this.numero.value)
        console.log(processo)
        if (processo.validate()) {
          processo.save(this.tableId.value)
          this.removePainel()
        } else {
          alert('erro')
        }
      })
    } else {
      alert('É necessário carregar uma tabela antes!')
    }
  }
}
