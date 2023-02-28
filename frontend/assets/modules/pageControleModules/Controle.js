import HandleSaveProcess from './HandleSaveProcess'
import Processo from './Processo'
import Table from './Table'
import uploadProcess from './uploadProcess'

export default class Controle {
  constructor () {
    this.buscaProcesso = document.querySelector('#table-search-processo')
    this.buscaSigla = document.querySelector('#table-search-sigla')
    this.buscaStatus = document.querySelector('#table-search-status')
    this.btnNewProcess = document.querySelector('#btn-new-process')
    this.numbers = '0123456789'
    this.file = document.getElementById('dropzone-file')
  }

  // Initialize listeners field search process number
  setFieldProcess () {
    this.buscaProcesso.addEventListener('input', (e) => {
      if (this.numbers.indexOf(e.data) < 0) {
        this.buscaProcesso.value = this.buscaProcesso.value.slice(0, -1)
      }
      if (this.buscaProcesso.value.length === 26) {
        this.buscaProcesso.value = this.buscaProcesso.value.slice(0, -1)
      }
      if (this.numbers.includes(e.data) || e.data === 'Backspace') {
        if (this.buscaProcesso.value.length === 10 || this.buscaProcesso.value.length === 15 || this.buscaProcesso.value.length === 17 || this.buscaProcesso.value.length === 20) {
          this.buscaProcesso.value += '.'
        }
        if (this.buscaProcesso.value.length === 7) {
          this.buscaProcesso.value += '-'
        }
        Processo.show()
      }
    })
  }

  // Initialize listeners field search sigla
  setFieldSigla () {
    this.buscaSigla.addEventListener('change', () => {
      Processo.show()
    })
  }

  // Initialize listeners field search status
  setFieldStatus () {
    this.buscaStatus.addEventListener('change', () => {
      Processo.show()
    })
  }

  // Initialize listeners field file upload
  setFieldFile () {
    this.file.addEventListener('change', () => {
      uploadProcess(this.file.files[0])
    })
    this.file.addEventListener('drop', () => {
      uploadProcess(this.file.files[0])
    })
  }

  setNewProcess () {
    this.btnNewProcess.addEventListener('click', () => {
      document.querySelector('#close-new-process').addEventListener('click', () => {
        document.querySelector('#form-new-process').classList.remove('flex')
        document.querySelector('#form-new-process').classList.add('hidden')
      })
      const saveProcess = new HandleSaveProcess()
      saveProcess.start()
    })
  }

  async setFieldTables () {
    this.tablesSaved = document.querySelectorAll('.select-saved-table')
    if (this.tablesSaved.length > 0) {
      this.tablesSaved.forEach(el => {
        el.addEventListener('click', async (e) => {
          e.preventDefault()
          const tableNum = e.target.getAttribute('table-num')
          const id = e.target.getAttribute('id')
          if (id) {
            try {
              const table = new Table()
              await table.get(id, tableNum)
              return
            } catch (e) { console.log(e) }
          }
        })
      })
    }
  }

  setToTopFunc () {
    document.getElementById('to-top-anchor').addEventListener('click', (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    })
  }

  setHideMenuSearch () {
    this.hidded = false
    const menu = document.querySelector('#menu-search')
    const btn = document.querySelector('#btn-hide-menu-search')
    btn.addEventListener('click', (e) => {
      if (!this.hidded) {
        menu.style.transform = 'translateX(-87.5%)'
        e.target.innerText = 'Mostrar'
        this.hidded = true
      } else {
        menu.style.transform = 'translateX(0%)'
        e.target.innerText = 'Ocultar'
        this.hidded = false
      }
    })
  }

  init () {
    Controle.backdrop = document.querySelector('#backdrop')
    this.setFieldProcess()
    this.setFieldSigla()
    this.setFieldStatus()
    this.setFieldFile()
    this.setFieldTables()
    this.setToTopFunc()
    this.setNewProcess()
    this.setHideMenuSearch()
  }
}
