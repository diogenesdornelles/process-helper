import tema from './Tema'
import moveToTopElement from '../utils/moveToTopElement'
import reinitApp from '../utils/reinitApp'
import { setBackdropLoad, removeBackdropLoad } from '../utils/backdropLoad'
import ControllSubjectTema from '../../pageTemasModules/ControllSubjectTema'

class HandleTema {
  async save () {
    try {
      if (tema.validate()) {
        await tema.save()
        window.location.assign('/tema')
        const last = [...document.querySelector('.accordion-heading')].pop()
        last.click()
        moveToTopElement(last)
      } else {
        alert('Fornecer dados de todos os campos!')
      }
    } catch (err) { console.error(err) }
  }

  async update (btn) {
    try {
      const temaId = btn.getAttribute('tema-id')
      const data = await tema.update(temaId)
      if (data) {
        document.querySelector('#accordion-container').innerHTML = data
        alert('Tema atualizado com sucesso!')
        reinitApp()
      }
    } catch (err) { console.error(err) }
  }

  async delete (btn) {
    if (confirm('Deseja deletar o tema?')) {
      try {
        const temaId = btn.getAttribute('tema-id')
        const data = await tema.delete(temaId)
        if (data) {
          document.querySelector('#accordion-container').innerHTML = data
          alert('Tema deletado com sucesso!')
          reinitApp()
        }
      } catch (err) { console.error(err) }
    }
  }

  async getOne (el) {
    const temaId = el.getAttribute('id')
    try {
      const data = await tema.getOne(temaId)
      if (data) {
        document.querySelector('#accordion-container').innerHTML = data
        reinitApp()
        document.querySelector('#dropdownList').classList.add('hidden')
        const btn = document.querySelector(`BUTTON[tema-id="${temaId}"]`)
        moveToTopElement(btn)
      }
    } catch (e) { console.log(e) }
  }

  async fireGetOne () {
    const saveds = document.querySelectorAll('.select-saved-tema')
    saveds.forEach(async saved => {
      saved.addEventListener('click', async (e) => {
        e.preventDefault()
        try {
          await this.getOne(e.target)
        } catch (e) { console.log(e) }
      }, { once: true })
    })
  }

  async getList () {
    const data = await tema.getList()
    if (data) {
      document.getElementById('dropdownList').innerHTML = data
      try {
        await this.fireGetOne()
      } catch (e) { console.log(e) }
    }
  }

  async getAll () {
    try {
      await setBackdropLoad(ControllSubjectTema.backdrop)
      const data = await tema.getAll()
      if (data) {
        document.querySelector('#accordion-container').innerHTML = data
        reinitApp()
        await removeBackdropLoad(ControllSubjectTema.backdrop)
        const div = document.querySelector('#accordion-container')
        moveToTopElement(div)
      }
    } catch (e) { console.log(e) }
  }

  async getType (type) {
    type.addEventListener('click', async (e) => {
      e.preventDefault()
      try {
        const data = await tema.getType(e.target.href)
        if (data) {
          document.querySelector('#accordion-container').innerHTML = data
          reinitApp()
          document.querySelector('#dropdownDefaultTemasType').click()
          const div = document.querySelector('#accordion-container')
          moveToTopElement(div)
        }
      } catch (e) { console.log(e) }
    }, { once: true })
  }

  async getJuizo (juizo) {
    try {
      const data = await tema.getJuizo(juizo)
      if (data) {
        document.querySelector('#accordion-container').innerHTML = data
        reinitApp()
        document.querySelector('#dropdownDefaultTemasJuizo').click()
        const div = document.querySelector('#accordion-container')
        moveToTopElement(div)
      }
    } catch (e) { console.log(e) }
  }

  removeColor () {
    const indicators = document.querySelectorAll('.select-tema-indicator')
    indicators.forEach(_indicator => {
      _indicator.classList.remove('text-blue-700')
      _indicator.parentElement.querySelector('DIV').classList.remove('bg-blue-700')
    })
  }

  addColor (el1, el2) {
    el1.classList.add('text-blue-700')
    el2.classList.add('bg-blue-700')
  }

  indicators (el) {
    const temaId = el.getAttribute('tema-id')
    const btn = document.querySelector(`BUTTON[tema-id="${temaId}"]`)
    this.removeColor()
    this.addColor(el, el.parentElement.querySelector('DIV'))
    btn.click()
    moveToTopElement(btn)
  }

  observers () {
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
}

export default new HandleTema()
