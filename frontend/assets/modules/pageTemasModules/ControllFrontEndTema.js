import handler from './temas/HandleTema'
// import hideContent from './temas/hideContent'
import setToTopFunc from './utils/setToTopFunc'
import textareaAutoExpand from './utils/textareaAutoExpand'
import moveToTopElement from './utils/moveToTopElement'

export default class ControllFrontEndTema {
  static fireSave () {
    const dropdownBtn = document.querySelector('#dropdownDefaultButton')
    dropdownBtn.addEventListener('click', () => {
      const content = document.querySelector('#temas-content')
      const dropdown = document.querySelector('#dropdown')
      moveToTopElement(dropdown)
      dropdown.addEventListener('click', (e) => {
        e.stopPropagation()
        content.style.display = 'none'
      })
      const input = document.querySelector('#new-tema-name')
      input.addEventListener('click', () => {
        const divs = document.querySelectorAll('div-hidded')
        divs.forEach(div => {
          div.classList.toggle('block')
        })
      })
      dropdownBtn.addEventListener('focusout', () => {
        content.style.display = 'block'
      })
      if (content.style.display === 'none') {
        content.style.display = 'block'
      }
      document.addEventListener('click', (e) => {
        if (e.target !== dropdown) {
          content.style.display = 'block'
        }
      })
      const submit = document.querySelector('#submit-new-tema')
      submit.addEventListener('click', async () => {
        try {
          await handler.save()
        } catch (e) { console.log(e) }
      }, { once: true })
    })
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
          await handler.getType(e.target.href)
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
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        let id = entry.target.getAttribute('id')
        id = id.split('-').splice(-1)[0]
        const indicator = document.querySelector(`TIME[tema-id="${id}"]`)
        indicator.classList.toggle('text-blue-600', entry.isIntersecting)
        const divIndicator = document.querySelector(`#tema-div-indicator-${id}`)
        if (entry.isIntersecting && divIndicator.classList.contains('bg-gray-200')) {
          divIndicator.classList.remove('bg-gray-200')
          divIndicator.classList.add('bg-blue-600')
        } else {
          divIndicator.classList.add('bg-gray-200')
          divIndicator.classList.remove('bg-blue-600')
        }
      })
    },
    {
      rootMargin: '-125px'
    })
    const observeds = document.querySelectorAll('.container-one-tema')
    observeds.forEach((element) => observer.observe(element))
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
    ControllFrontEndTema.fireObserver()
    setToTopFunc()
    textareaAutoExpand()
  }
}
