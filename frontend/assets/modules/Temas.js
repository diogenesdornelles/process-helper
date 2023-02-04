import Tema from './temas/Tema'
import Textos from './Textos'
import textareaAutoExpand from './textarea/textareaAutoExpand'

export default class Temas {
  static accordion = {
    variables: {}
  }

  static tema = {
    variables: {}
  }

  static accordionOptions = {
    alwaysOpen: false,
    activeClasses: 'bg-blue-600 hover:bg-blue-800 text-white border-blue-800 focus:ring-blue-200',
    inactiveClasses: 'bg-gray-100 hover:bg-gray-200 text-black border-gray-200 focus:ring-gray-300',
    onOpen: (item) => {},
    onClose: (item) => {},
    onToggle: (item) => {}
  }

  static async handleSaveTema () {
    document.querySelector('#dropdownDefaultButton').addEventListener('click', () => {
      document.querySelector('#submit-new-tema').addEventListener('click', async () => {
        try {
          const tema = new Tema()
          if (tema.validate()) {
            await tema.save()
          } else {
            alert('Fornecer dados de todos os campos!')
          }
        } catch (err) { console.error(err) }
      }, { once: true })
    })
  }

  static async handleUpdateTema () {
    Temas.accordion.variables.btnsUpdate = document.querySelectorAll('.anchor-update-tema')
    Temas.accordion.variables.btnsUpdate.forEach(btn => {
      btn.addEventListener('click', async (el) => {
        el.preventDefault()
        el.stopPropagation()
        try {
          const temaId = el.target.getAttribute('tema-id')
          const tema = new Tema()
          const data = await tema.update(temaId)
          if (data) {
            document.querySelector('#accordion-container').innerHTML = data
            alert('Tema atualizado com sucesso!')
            Temas.accordionStart()
            Textos.init()
          }
        } catch (err) { console.error(err) }
      })
    })
  }

  static async handleDeleteTema () {
    Temas.accordion.variables.btnsDelete = document.querySelectorAll('.anchor-delete-tema')
    Temas.accordion.variables.btnsDelete.forEach(btn => {
      btn.addEventListener('click', async (el) => {
        el.preventDefault()
        el.stopPropagation()
        if (confirm('Deseja deletar o tema?')) {
          try {
            const temaId = el.target.getAttribute('tema-id')
            const tema = new Tema()
            const data = await tema.delete(temaId)
            if (data) {
              document.querySelector('#accordion-container').innerHTML = data
              alert('Tema deletado com sucesso!')
              Temas.accordionStart()
              Textos.init()
            }
          } catch (err) { console.error(err) }
        }
      })
    })
  }

  static getItemsAccordion () {
    Temas.accordion.variables.headers = document.querySelectorAll('.accordion-heading')
    Temas.accordion.variables.bodies = document.querySelectorAll('.accordion-body')
    for (let i = 0; i < Temas.accordion.variables.headers.length; i++) {
      if (!i) {
        Temas.accordion.variables.accordionItems.push({
          id: Temas.accordion.variables.headers[i].getAttribute('id'),
          triggerEl: document.querySelector(`#${Temas.accordion.variables.headers[i].getAttribute('id')}`),
          targetEl: document.querySelector(`#${Temas.accordion.variables.bodies[i].getAttribute('id')}`),
          active: true
        })
      } else {
        Temas.accordion.variables.accordionItems.push({
          id: Temas.accordion.variables.headers[i].getAttribute('id'),
          triggerEl: document.querySelector(`#${Temas.accordion.variables.headers[i].getAttribute('id')}`),
          targetEl: document.querySelector(`#${Temas.accordion.variables.bodies[i].getAttribute('id')}`),
          active: false
        })
      }
    }
  }

  static moveToTopElement (el, y = 0) {
    const top = el.getBoundingClientRect().top + window.scrollY - document.querySelector('#nav-menu').offsetHeight + y
    window.scroll({
      top,
      behavior: 'smooth'
    })
  }

  static setAccordion () {
    // eslint-disable-next-line no-undef
    Temas.accordion.variables.accordion = new Accordion(Temas.accordion.variables.accordionItems, Temas.accordionOptions)
    Temas.accordion.variables.headers = document.querySelectorAll('.accordion-heading')
    Temas.accordion.variables.headers.forEach(header => {
      header.addEventListener('click', (el) => {
        Temas.accordion.variables.accordion.open(`${el.target.getAttribute('id')}`)
        textareaAutoExpand()
        setTimeout(() => {
          Temas.moveToTopElement(el.target)
        }, 200)
      })
    })
  }

  static async getOneTema () {
    Temas.tema.variables.savedTemas = document.querySelectorAll('.select-saved-tema')
    Temas.tema.variables.savedTemas.forEach(savedTema => {
      savedTema.addEventListener('click', async (e) => {
        e.preventDefault()
        const temaId = e.target.getAttribute('id')
        try {
          const tema = new Tema()
          const data = await tema.getOne(temaId)
          if (data) {
            document.querySelector('#accordion-container').innerHTML = data
            alert('Tema carregado!')
            Temas.accordionStart()
            Textos.init()
            document.querySelector('#dropdownList').classList.add('hidden')
          }
        } catch (e) { console.log(e) }
      }, { once: true })
    })
  }

  static async setTemasList () {
    try {
      document.querySelector('#dropdownDefaultButtonTemasList').addEventListener('click', async () => {
        const tema = new Tema()
        const data = await tema.getList()
        if (data) {
          document.getElementById('dropdownList').innerHTML = data
          await Temas.getOneTema()
        }
      }, { once: true })
    } catch (err) { console.error(err) }
  }

  static async setGetAllTemas () {
    document.querySelector('#get-all-temas').addEventListener('click', async function () {
      try {
        const tema = new Tema()
        const data = await tema.getAll()
        if (data) {
          document.querySelector('#accordion-container').innerHTML = data
          alert('Temas carregados!')
          Temas.accordionStart()
          Textos.init()
        }
      } catch (e) { console.log(e) }
    })
  }

  static async setTemasType () {
    Temas.tema.variables.savedTypes = document.querySelectorAll('.select-anchor-tema-type')
    Temas.tema.variables.savedTypes.forEach(type => {
      type.addEventListener('click', async (e) => {
        e.preventDefault()
        try {
          const tema = new Tema()
          const data = await tema.getType(e.target.href)
          if (data) {
            document.querySelector('#accordion-container').innerHTML = data
            alert('Tipo de tema carregado!')
            Temas.accordionStart()
            Textos.init()
            document.querySelector('#dropdownDefaultTemasType').click()
          }
        } catch (e) { console.log(e) }
      })
    }, { once: true })
  }

  static async setTemasJuizo () {
    Temas.tema.variables.savedJuizos = document.querySelectorAll('.select-anchor-tema-juizo')
    Temas.tema.variables.savedJuizos.forEach(type => {
      type.addEventListener('click', async (e) => {
        e.preventDefault()
        try {
          const tema = new Tema()
          const data = await tema.getJuizo(e.target.href)
          if (data) {
            document.querySelector('#accordion-container').innerHTML = data
            alert('Temas por juizo carregado!')
            Temas.accordionStart()
            Textos.init()
            document.querySelector('#dropdownDefaultTemasJuizo').click()
          }
        } catch (e) { console.log(e) }
      })
    }, { once: true })
  }

  static setEditTema () {
    Temas.accordion.variables.temas = document.querySelectorAll('.input-tema-name')
    Temas.accordion.variables.types = document.querySelectorAll('.select-type-tema')
    Temas.accordion.variables.juizos = document.querySelectorAll('.select-juizo-tema')
    Temas.accordion.variables.temas.forEach(tema => {
      tema.addEventListener('click', (el) => {
        el.stopPropagation()
      })
    })
    Temas.accordion.variables.temas.forEach(tema => {
      tema.addEventListener('dblclick', (el) => {
        el.target.removeAttribute('readonly', 'readonly')
      })
    })
    Temas.accordion.variables.temas.forEach(tema => {
      tema.addEventListener('focusout', (el) => {
        el.target.setAttribute('readonly', 'readonly')
      })
    })
    Temas.accordion.variables.types.forEach(type => {
      type.addEventListener('click', (el) => {
        el.stopPropagation()
      })
    })
    Temas.accordion.variables.juizos.forEach(type => {
      type.addEventListener('click', (el) => {
        el.stopPropagation()
      })
    })
  }

  static setToTopFunc () {
    document.getElementById('to-top-anchor').addEventListener('click', (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    })
  }

  static removeColor () {
    Temas.accordion.variables.indicators = document.querySelectorAll('.select-tema-indicator')
    Temas.accordion.variables.indicators.forEach(_indicator => {
      _indicator.classList.remove('text-blue-700')
      _indicator.parentElement.querySelector('DIV').classList.remove('bg-blue-700')
    })
  }

  static addColor (el1, el2) {
    el1.classList.add('text-blue-700')
    el2.classList.add('bg-blue-700')
  }

  static setIndicators () {
    Temas.accordion.variables.indicators = document.querySelectorAll('.select-tema-indicator')
    Temas.accordion.variables.indicators.forEach(indicator => {
      indicator.addEventListener('click', (e) => {
        const temaId = e.target.getAttribute('tema-id')
        const btn = document.querySelector(`BUTTON[tema-id="${temaId}"]`)
        Temas.removeColor()
        Temas.addColor(e.target, e.target.parentElement.querySelector('DIV'))
        btn.click()
        Temas.moveToTopElement(btn)
      })
    })
  }

  static addObserverTemaIndicators () {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        let id = entry.target.getAttribute('id')
        id = id.split('-').splice(-1)[0]
        const indicator = document.querySelector(`TIME[tema-id="${id}"]`)
        indicator.classList.toggle('text-blue-700', entry.isIntersecting)
        indicator.parentElement.querySelector('DIV').classList.toggle('bg-blue-700', entry.isIntersecting)
      })
    },
    {
      rootMargin: '-125px'
    })
    Temas.accordion.variables.headingsSelected = document.querySelectorAll('.container-one-tema')
    Temas.accordion.variables.headingsSelected.forEach((element) => observer.observe(element))
  }

  static scrollRevealTexto () {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        entry.target.classList.toggle('show-text-tema', entry.isIntersecting)
      })
    },
    {
      rootMargin: '-200px'
    })
    Temas.accordion.variables.texties = document.querySelectorAll('.hidden-text-tema')
    Temas.accordion.variables.texties.forEach((element) => observer.observe(element))
  }

  static accordionStart () {
    Temas.accordion.variables = {}
    Temas.accordion.variables.accordionItems = []
    Temas.getItemsAccordion()
    Temas.setAccordion()
    Temas.setEditTema()
    Temas.handleDeleteTema()
    Temas.handleUpdateTema()
    Temas.scrollRevealTexto()
    Temas.addObserverTemaIndicators()
  }

  static init () {
    Temas.tema.variables = {}
    Temas.setTemasList()
    Temas.setTemasType()
    Temas.setTemasJuizo()
    Temas.setGetAllTemas()
    Temas.setIndicators()
    Temas.handleSaveTema()
    textareaAutoExpand()
    Temas.setToTopFunc()
  }
}
