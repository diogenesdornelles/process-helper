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

  static async submit (temaId, _modal, el) {
    async function save () {
      try {
        if (await handler.save(temaId)) {
          _modal.close()
          moveToTopElement(el)
        } else {
          ControllSubjectTexto.submit(temaId, _modal)
        }
      } catch (e) { console.log(e) }
    }
    const btnSubmit = document.querySelector('#submit-new-texto')
    const btnClose = document.querySelector('#hide-new-texto-modal')
    btnSubmit.addEventListener('click', save, { once: true })
    btnClose.addEventListener('click', () => {
      _modal.close()
      btnSubmit.removeEventListener('click', save)
    })
  }

  static async fireNew () {
    const btns = document.querySelectorAll('.btn-new-texto')
    const _modal = document.querySelector('#modal-new-texto')
    btns.forEach(btn => {
      btn.addEventListener('click', (el) => {
        _modal.showModal()
        moveToTopElement(el.target)
        const temaId = el.target.getAttribute('tema-id')
        ControllSubjectTexto.submit(temaId, _modal, el.target)
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

  static async fireScrollReveal () {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        entry.target.classList.toggle('show-text-tema', entry.isIntersecting)
      })
    },
    {
      rootMargin: '-200px'
    })
    const texties = document.querySelectorAll('.hidden-text-tema')
    texties.forEach((element) => observer.observe(element))
  }

  static async fireSearch () {
    let text = ''
    const interval = () => setInterval(() => {
      if (text) {
        window.find(text)
      }
    }, 1200)

    const content = document.querySelector('#input-search-texto')
    const juizo = document.querySelector('#tema-search-select-juizo')
    const type = document.querySelector('#tema-search-select-type')
    content.addEventListener('focus', async (e) => {
      moveToTopElement(e.target, -200)
      if (text) {
        // interval()
      }
    })
    content.addEventListener('focusout', async (e) => {
      clearInterval(interval)
    })
    content.addEventListener('input', async (e) => {
      try {
        text = e.target.value
        await handler.search(text, juizo.value, type.value)
      } catch (e) { console.log(e) }
    })
  }

  static start () {
    ControllSubjectTexto.fireScrollReveal()
    ControllSubjectTexto.setEdit()
    ControllSubjectTexto.fireSearch()
    ControllSubjectTexto.fireDelete()
    ControllSubjectTexto.fireUpdate()
    ControllSubjectTexto.fireCopy()
    ControllSubjectTexto.fireNew()
  }
}
