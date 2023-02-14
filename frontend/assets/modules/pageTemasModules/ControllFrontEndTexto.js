import moveToTopElement from './utils/moveToTopElement'
import handler from './textos/HandleTexto'

export default class ControllFrontEndTexto {
  static showPainelNew () {
    const form = document.querySelector('#form-new-texto')
    form.classList.remove('hidden')
    form.classList.add('flex')
    setTimeout(() => {
      moveToTopElement(form)
    }, 200)
  }

  static removePainelNew () {
    const btnClose = document.querySelector('#close-new-texto')
    btnClose.addEventListener('click', () => {
      document.querySelector('#form-new-texto').classList.remove('flex')
      document.querySelector('#form-new-texto').classList.add('hidden')
    })
  }

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

  static async submit (temaId) {
    const btnSubmit = document.querySelector('#submit-new-texto')
    btnSubmit.addEventListener('click', async () => {
      try {
        await handler.save(temaId)
      } catch (e) { console.log(e) }
    }, { once: true })
  }

  static async fireNew () {
    const btns = document.querySelectorAll('.btn-new-texto')
    btns.forEach(btn => {
      btn.addEventListener('click', (el) => {
        const temaId = el.target.getAttribute('tema-id')
        ControllFrontEndTexto.showPainelNew()
        ControllFrontEndTexto.removePainelNew()
        ControllFrontEndTexto.submit(temaId)
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
    const content = document.querySelector('#input-search-texto')
    const juizo = document.querySelector('#tema-search-select-juizo')
    const type = document.querySelector('#tema-search-select-type')
    content.addEventListener('focus', async (e) => {
      moveToTopElement(e.target, -200)
    })
    content.addEventListener('input', async (e) => {
      try {
        await handler.search(e.target.value, juizo.value, type.value)
      } catch (e) { console.log(e) }
    })
  }

  static start () {
    ControllFrontEndTexto.fireScrollReveal()
    ControllFrontEndTexto.setEdit()
    ControllFrontEndTexto.fireSearch()
    ControllFrontEndTexto.fireDelete()
    ControllFrontEndTexto.fireUpdate()
    ControllFrontEndTexto.fireCopy()
    ControllFrontEndTexto.fireNew()
  }
}
