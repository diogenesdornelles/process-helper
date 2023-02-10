import handler from './temas/HandleTema'
import setToTopFunc from './utils/setToTopFunc'
import textareaAutoExpand from './utils/textareaAutoExpand'

export default class ControllFrontEndTema {
  static async fireSave () {
    document.querySelector('#dropdownDefaultButton').addEventListener('click', async () => {
      document.querySelector('#submit-new-tema').addEventListener('click', async () => {
        try {
          await handler.save()
        } catch (e) { console.log(e) }
      }, { once: true })
    }, { once: true })
  }

  static async fireUpdate () {
    const btns = document.querySelectorAll('.anchor-update-tema')
    btns.forEach(async btn => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault()
        e.stopPropagation()
        try {
          await handler.update(e.target)
        } catch (e) { console.log(e) }
      }, { once: true })
    })
  }

  static async fireDelete () {
    const btns = document.querySelectorAll('.anchor-delete-tema')
    btns.forEach(async btn => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault()
        e.stopPropagation()
        try {
          await handler.delete(e.target)
        } catch (e) { console.log(e) }
      }, { once: true })
    })
  }

  static async fireList () {
    try {
      document.querySelector('#dropdownDefaultButtonTemasList').addEventListener('click', async () => {
        await handler.getList()
      }, { once: true })
    } catch (err) { console.error(err) }
  }

  static async fireAll () {
    document.querySelector('#get-all-temas').addEventListener('click', async () => {
      try {
        await handler.getAll()
      } catch (e) { console.log(e) }
    }, { once: true })
  }

  static async fireType () {
    const types = document.querySelectorAll('.select-anchor-tema-type')
    types.forEach(async type => {
      type.addEventListener('click', async (e) => {
        e.preventDefault()
        try {
          await handler.getType(e.target.href)
        } catch (e) { console.log(e) }
      }, { once: true })
    })
  }

  static async fireJuizo () {
    const juizos = document.querySelectorAll('.select-anchor-tema-juizo')
    juizos.forEach(async juizo => {
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
    handler.addObserverTemaIndicators()
    const indicators = document.querySelectorAll('.select-tema-indicator')
    indicators.forEach(async indicator => {
      indicator.addEventListener('click', async (e) => {
        try {
          await handler.indicators(e.target)
        } catch (e) { console.log(e) }
      })
    })
  }

  static start () {
    ControllFrontEndTema.fireSave()
    ControllFrontEndTema.fireUpdate()
    ControllFrontEndTema.fireDelete()
    ControllFrontEndTema.fireList()
    ControllFrontEndTema.fireAll()
    ControllFrontEndTema.fireType()
    ControllFrontEndTema.fireJuizo()
    ControllFrontEndTema.fireEdit()
    ControllFrontEndTema.fireIndicators()
    setToTopFunc()
    textareaAutoExpand()
  }
}
