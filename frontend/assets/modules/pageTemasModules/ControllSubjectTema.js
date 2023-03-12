import handler from './temas/HandleTema'
import setToTopFunc from './utils/setToTopFunc'
import textareaAutoExpand from './utils/textareaAutoExpand'
import moveToTopElement from './utils/moveToTopElement'

// get start with listerners and observers
export default class ControllSubjectTema {
  static fireSave () {
    const btn1 = document.querySelector('#btn-open-modal-new-tema')
    const btn2 = document.querySelector('#btn-hide-new-tema-modal')
    const btn3 = document.querySelector('#btn-hide-new-tema-modal-2')
    const modal = document.querySelector('#modal-new-tema')
    const type = document.querySelector('#new-tema-texto-type')
    const timeFrame = document.querySelector('#time-frame-tse')
    if (type.value === 'tempo_especial') {
      timeFrame.style.display = 'block'
    }
    type.addEventListener('change', (e) => {
      if (e.target.value === 'tempo_especial') {
        timeFrame.style.display = 'block'
      } else {
        timeFrame.style.display = 'none'
      }
    })
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
    const submit = document.querySelector('#btn-submit-new-tema')
    submit.addEventListener('click', async () => {
      try {
        await handler.save()
        modal.close()
      } catch (e) { console.log(e) }
    }, { once: true })
  }

  static fireUpdate () {
    const anchors = document.querySelectorAll('.anchor-update-tema')
    anchors.forEach(btn => {
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
    const anchors = document.querySelectorAll('.anchor-delete-tema')
    anchors.forEach(btn => {
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
    const anchors = document.querySelectorAll('.select-anchor-tema-type')
    anchors.forEach(type => {
      type.addEventListener('click', async (e) => {
        e.preventDefault()
        try {
          await handler.getType(e.target)
        } catch (e) { console.log(e) }
      }, { once: true })
    })
  }

  static fireJuizo () {
    const anchors = document.querySelectorAll('.select-anchor-tema-juizo')
    anchors.forEach(juizo => {
      juizo.addEventListener('click', async (e) => {
        e.preventDefault()
        try {
          await handler.getJuizo(e.target.href)
        } catch (e) { console.error(e) }
      }, { once: true })
    })
  }

  static fireEdit () {
    const inputsTema = document.querySelectorAll('.input-tema-name')
    const selectsType = document.querySelectorAll('.select-type-tema')
    const selectJuizo = document.querySelectorAll('.select-juizo-tema')
    inputsTema.forEach(tema => {
      tema.addEventListener('click', (e) => {
        e.stopPropagation()
      })
    })
    inputsTema.forEach(tema => {
      tema.addEventListener('dblclick', (e) => {
        e.target.removeAttribute('readonly', 'readonly')
      })
    })
    inputsTema.forEach(tema => {
      tema.addEventListener('focusout', (e) => {
        e.target.setAttribute('readonly', 'readonly')
      })
    })
    selectsType.forEach(type => {
      type.addEventListener('click', (e) => {
        e.stopPropagation()
      })
    })
    selectJuizo.forEach(type => {
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
