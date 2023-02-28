import moveToTopElement from './utils/moveToTopElement'
import handler from './textos/HandleTexto'

export default class ControllSubjectTexto {
  static fireCopy () {
    const btnsCopy = document.querySelectorAll('.btn-copiar-texto')
    btnsCopy.forEach(btn => {
      btn.addEventListener('click', (el) => {
        handler.copy(el.target)
      })
    })
  }

  static fireCopyResult () {
    const btns = document.querySelectorAll('.btn-copy-texto-result')
    btns.forEach(btn => {
      btn.addEventListener('click', (el) => {
        handler.result(el.target)
      })
    })
  }

  static async submit (temaId, modal, el, header) {
    async function save () {
      try {
        if (!await handler.save(temaId, modal, el, header)) {
          ControllSubjectTexto.submit(temaId, modal)
        }
      } catch (e) { console.log(e) }
    }
    const btnSubmit = document.querySelector('#submit-new-texto')
    const btnClose = document.querySelector('#hide-new-texto-modal')
    btnSubmit.addEventListener('click', save, { once: true })
    btnClose.addEventListener('click', () => {
      modal.close()
      header.click()
      btnSubmit.removeEventListener('click', save)
    })
  }

  static async fireNew () {
    const btns = document.querySelectorAll('.btn-new-texto')
    const modal = document.querySelector('#modal-new-texto')
    btns.forEach(btn => {
      btn.addEventListener('click', (el) => {
        modal.showModal()
        moveToTopElement(el.target)
        const temaId = el.target.getAttribute('tema-id')
        const idHeader = el.target.getAttribute('btn-linked-to')
        const header = document.querySelector(`#${idHeader}`)
        ControllSubjectTexto.submit(temaId, modal, el.target, header)
      })
    })
  }

  static async fireUpdate () {
    const btns = document.querySelectorAll('.btn-salvar-texto')
    btns.forEach(btn => {
      btn.addEventListener('click', async (el) => {
        try {
          await handler.update(el.target)
        } catch (e) { console.log(e) }
      })
    })
  }

  static async fireDelete () {
    const btns = document.querySelectorAll('.btn-deletar-texto')
    btns.forEach(btn => {
      btn.addEventListener('click', async (el) => {
        try {
          await handler.delete(el.target)
        } catch (e) { console.log(e) }
      })
    })
  }

  static setEdit () {
    const descriptions = document.querySelectorAll('.input-text-description')
    const contents = document.querySelectorAll('.textarea-text-content')
    descriptions.forEach(item => {
      item.addEventListener('dblclick', (el) => {
        el.target.removeAttribute('readonly', 'readonly')
      })
    })
    contents.forEach(item => {
      item.addEventListener('dblclick', (el) => {
        el.target.removeAttribute('readonly', 'readonly')
      })
    })
    descriptions.forEach(item => {
      item.addEventListener('focusout', (el) => {
        el.target.setAttribute('readonly', 'readonly')
      })
    })
    contents.forEach(item => {
      item.addEventListener('focusout', (el) => {
        el.target.setAttribute('readonly', 'readonly')
      })
    })
  }

  static async fireSearch () {
    let text = ''
    const content = document.querySelector('#input-search-texto')
    const juizo = document.querySelector('#tema-search-select-juizo')
    const type = document.querySelector('#tema-search-select-type')
    const tema = document.querySelector('#tema-search-select-tema')
    content.addEventListener('focus', async (e) => {
      moveToTopElement(e.target, -200)
    })
    // eslint-disable-next-line no-undef
    const debouncedInput = _.debounce(async (e) => {
      try {
        text = e.target.value
        await handler.search(text, juizo.value, type.value, tema.value)
      } catch (e) { console.log(e) }
    }, 500)
    console.log(typeof debouncedInput)
    content.addEventListener('input', debouncedInput)
  }

  static start () {
    ControllSubjectTexto.setEdit()
    ControllSubjectTexto.fireSearch()
    ControllSubjectTexto.fireDelete()
    ControllSubjectTexto.fireUpdate()
    ControllSubjectTexto.fireCopy()
    ControllSubjectTexto.fireNew()
  }
}
