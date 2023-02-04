import Texto from './temas/Texto'
import Tema from './temas/Tema'
import Temas from './Temas'
import Editor from './Editor'
import textareaAutoExpand from './textarea/textareaAutoExpand'

export default class Textos {
  static showPainelNewTexto () {
    const form = document.querySelector('#form-new-texto')
    form.classList.remove('hidden')
    form.classList.add('flex')
    setTimeout(() => {
      Temas.moveToTopElement(form)
    }, 200)
  }

  static removePainelNewTexto () {
    Texto.btnClose = document.querySelector('#close-new-texto')
    Texto.btnClose.addEventListener('click', () => {
      document.querySelector('#form-new-texto').classList.remove('flex')
      document.querySelector('#form-new-texto').classList.add('hidden')
    })
  }

  static handleCopyTexto () {
    Texto.btnsCopy = document.querySelectorAll('.btn-copiar-texto')
    Texto.btnsCopy.forEach(btn => {
      btn.addEventListener('click', (el) => {
        const texto = el.target.parentNode.parentNode.querySelector('TEXTAREA').value
        navigator.clipboard.writeText(texto)
        Editor.conclusion.innerHTML += `<br>${texto}`
      })
    })
  }

  static async submitNewTexto () {
    Texto.btnSubmit = document.querySelector('#submit-new-texto')
    Texto.btnSubmit.addEventListener('click', async () => {
      try {
        const texto = new Texto()
        if (texto.validate()) {
          const data = await texto.save(Textos.temaId)
          if (data) {
            alert('Texto salvo!')
            document.querySelector('#accordion-container').innerHTML = data
            document.querySelector('#form-new-texto').classList.remove('flex')
            document.querySelector('#form-new-texto').classList.add('hidden')
            document.querySelector('#new-texto-description').value = ''
            document.querySelector('#new-texto-content').value = ''
            Temas.accordionStart()
            Textos.init()
          }
        } else {
          alert('Enviar dados completos!')
        }
      } catch (e) { console.log(e) }
    }, { once: true })
  }

  static handleNewTexto () {
    Texto.btnsNewTexto = document.querySelectorAll('.btn-new-texto')
    Texto.btnsNewTexto.forEach(btn => {
      btn.addEventListener('click', (el) => {
        Textos.temaId = el.target.getAttribute('tema-id')
        Textos.showPainelNewTexto()
        Textos.removePainelNewTexto()
        Textos.submitNewTexto()
      })
    })
  }

  static async handleUpdateTexto () {
    Texto.btnsSave = document.querySelectorAll('.btn-salvar-texto')
    Texto.btnsSave.forEach(btn => {
      btn.addEventListener('click', async (el) => {
        try {
          const textoId = el.target.getAttribute('texto-id')
          const temaId = el.target.getAttribute('tema-id')
          const texto = new Texto()
          const response = await texto.update(textoId, temaId)
          if (response) {
            const tema = new Tema()
            const data = await tema.getAll()
            if (data) {
              document.querySelector('#accordion-container').innerHTML = data
              alert('Texto atualizado!')
              Temas.accordionStart()
              Textos.init()
            }
          } else {
            return
          }
        } catch (err) { console.log(err) }
      })
    })
  }

  static async handleDeleteTexto () {
    Texto.btnsDelete = document.querySelectorAll('.btn-deletar-texto')
    Texto.btnsDelete.forEach(btn => {
      btn.addEventListener('click', async (el) => {
        try {
          const textoId = el.target.getAttribute('texto-id')
          const texto = new Texto()
          const response = await texto.delete(textoId)
          if (response) {
            const tema = new Tema()
            const data = await tema.getAll()
            if (data) {
              document.querySelector('#accordion-container').innerHTML = data
              alert('Texto deletado!')
              Temas.accordionStart()
              Textos.init()
            }
          } else {
            return
          }
        } catch (e) { console.log(e) }
      })
    })
  }

  static setEditTexto () {
    Texto.descriptions = document.querySelectorAll('.input-text-description')
    Texto.contents = document.querySelectorAll('.textarea-text-content')
    Texto.descriptions.forEach(item => {
      item.addEventListener('dblclick', (el) => {
        el.target.removeAttribute('readonly', 'readonly')
      })
    })
    Texto.contents.forEach(item => {
      item.addEventListener('dblclick', (el) => {
        el.target.removeAttribute('readonly', 'readonly')
      })
    })
    Texto.descriptions.forEach(item => {
      item.addEventListener('focusout', (el) => {
        el.target.setAttribute('readonly', 'readonly')
      })
    })
    Texto.contents.forEach(item => {
      item.addEventListener('focusout', (el) => {
        el.target.setAttribute('readonly', 'readonly')
      })
    })
  }

  static handleCopySearchResult () {
    Texto.btnsCopy = document.querySelectorAll('.btn-copy-texto-result')
    Texto.btnsCopy.forEach(btn => {
      btn.addEventListener('click', (el) => {
        const texto = el.target.parentNode.querySelector('.my-result-texto').textContent
        navigator.clipboard.writeText(texto)
        Editor.conclusion.innerHTML += `<br>${texto}`
      })
    })
  }

  static setFieldsSearchTexto () {
    Texto.buscaTexto = document.querySelector('#input-search-texto')
    Texto.buscaJuizo = document.querySelector('#tema-search-select-juizo')
    Texto.buscaTipo = document.querySelector('#tema-search-select-type')
    Texto.buscaTexto.addEventListener('focus', async (e) => {
      Temas.moveToTopElement(e.target, -200)
    })
    Texto.buscaTexto.addEventListener('input', async (e) => {
      try {
        if (!e.target.value) {
          document.querySelector('#search-result').innerHTML = ''
          return
        }
        const texto = new Texto()
        const result = await texto.show(e.target.value, Texto.buscaJuizo.value, Texto.buscaTipo.value)
        if (result) {
          document.querySelector('#search-result').innerHTML = result
          Textos.handleCopySearchResult()
        } else {
          document.querySelector('#search-result').innerHTML = ''
        }
      } catch (e) { console.log(e) }
    })
  }

  static init () {
    Textos.handleCopyTexto()
    Textos.handleNewTexto()
    Textos.handleDeleteTexto()
    Textos.handleUpdateTexto()
    Textos.setEditTexto()
    Textos.setFieldsSearchTexto()
    textareaAutoExpand()
  }
}
