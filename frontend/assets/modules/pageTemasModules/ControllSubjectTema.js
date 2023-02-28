import handler from './temas/HandleTema'
// import hideContent from './temas/hideContent'
import setToTopFunc from './utils/setToTopFunc'
import textareaAutoExpand from './utils/textareaAutoExpand'
import moveToTopElement from './utils/moveToTopElement'

// get start with listerners and observers
export default class ControllSubjectTema {
  static fireSave () {
    const btn1 = document.querySelector('#btn-open-modal-new-tema')
    const btn2 = document.querySelector('#hide-new-tema-modal')
    const btn3 = document.querySelector('#hide-new-tema-modal-2')
    const modal = document.querySelector('#modal-new-tema')
    btn1.addEventListener('click', () => {
      modal.showModal()
      moveToTopElement(modal)
    })
    btn2.addEventListener('click', () => {
      modal.close()
    })
    btn3.addEventListener('click', () => {
      modal.close()
    })
    const submit = document.querySelector('#submit-new-tema')
    submit.addEventListener('click', async () => {
      try {
        await handler.save()
        modal.close()
      } catch (e) { console.log(e) }
    }, { once: true })
  }

  static fireUpdate () {
    const btns = document.querySelectorAll('.anchor-update-tema')
    btns.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault()
        e.stopPropagation()
        try {
          await handler.update(e.target)
        } catch (e) { console.log(e) }
      }, { once: true })
    })
  }

  static fireDelete () {
    const btns = document.querySelectorAll('.anchor-delete-tema')
    btns.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault()
        e.stopPropagation()
        try {
          await handler.delete(e.target)
        } catch (e) { console.log(e) }
      }, { once: true })
    })
  }

  static fireList () {
    try {
      document.querySelector('#dropdownDefaultButtonTemasList').addEventListener('click', async () => {
        await handler.getList()
      }, { once: true })
    } catch (err) { console.error(err) }
  }

  static fireAll () {
    document.querySelector('#get-all-temas').addEventListener('click', async () => {
      try {
        await handler.getAll()
      } catch (e) { console.log(e) }
    }, { once: true })
  }

  static fireType () {
    const types = document.querySelectorAll('.select-anchor-tema-type')
    types.forEach(type => {
      type.addEventListener('click', async (e) => {
        e.preventDefault()
        try {
          await handler.getType(e.target)
        } catch (e) { console.log(e) }
      }, { once: true })
    })
  }

  static fireJuizo () {
    const juizos = document.querySelectorAll('.select-anchor-tema-juizo')
    juizos.forEach(juizo => {
      juizo.addEventListener('click', async (e) => {
        e.preventDefault()
        try {
          await handler.getJuizo(e.target.href)
        } catch (e) { console.error(e) }
      }, { once: true })
    })
  }

  static fireEdit () {
    const temas = document.querySelectorAll('.input-tema-name')
    const types = document.querySelectorAll('.select-type-tema')
    const juizos = document.querySelectorAll('.select-juizo-tema')
    temas.forEach(tema => {
      tema.addEventListener('click', (e) => {
        e.stopPropagation()
      })
    })
    temas.forEach(tema => {
      tema.addEventListener('dblclick', (e) => {
        e.target.removeAttribute('readonly', 'readonly')
      })
    })
    temas.forEach(tema => {
      tema.addEventListener('focusout', (e) => {
        e.target.setAttribute('readonly', 'readonly')
      })
    })
    types.forEach(type => {
      type.addEventListener('click', (e) => {
        e.stopPropagation()
      })
    })
    juizos.forEach(type => {
      type.addEventListener('click', (e) => {
        e.stopPropagation()
      })
    })
  }

  static fireIndicators () {
    const indicators = document.querySelectorAll('.select-tema-indicator')
    indicators.forEach(indicator => {
      indicator.addEventListener('click', (e) => {
        handler.indicators(e.target)
      })
    })
  }

  static fireObserver () {
    handler.observers()
  }

  static start () {
    ControllSubjectTema.backdrop = document.querySelector('#backdrop')
    ControllSubjectTema.fireSave()
    ControllSubjectTema.fireUpdate()
    ControllSubjectTema.fireDelete()
    ControllSubjectTema.fireList()
    ControllSubjectTema.fireAll()
    ControllSubjectTema.fireType()
    ControllSubjectTema.fireJuizo()
    ControllSubjectTema.fireEdit()
    ControllSubjectTema.fireIndicators()
    ControllSubjectTema.fireObserver()
    setToTopFunc()
    textareaAutoExpand()
  }
}
