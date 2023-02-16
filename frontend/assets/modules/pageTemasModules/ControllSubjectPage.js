import moveToTopElement from './utils/moveToTopElement'

class ControllSubjectPage {
  static removeColor () {
    const indicators = document.querySelectorAll('.select-page-indicator')
    indicators.forEach(_indicator => {
      _indicator.classList.remove('text-blue-700')
      _indicator.parentElement.querySelector('DIV').classList.remove('bg-blue-700')
    })
  }

  static addColor (el1, el2) {
    el1.classList.add('text-blue-700')
    el2.classList.add('bg-blue-700')
  }

  static fireIndicators () {
    const indicators = [...document.querySelectorAll('.select-page-indicator')]
    const sections = [...document.querySelectorAll('.tema-section')]
    indicators.forEach(indicator => {
      indicator.addEventListener('click', (e) => {
        ControllSubjectPage.removeColor()
        const index = indicators.indexOf(e.target)
        ControllSubjectPage.addColor(e.target, e.target.parentElement.querySelector('DIV'))
        moveToTopElement(sections[index])
      })
    })
  }

  static fireObserver () {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('secction')
        const indicator = document.querySelector(`#page-indicator-${id}`)
        indicator.classList.toggle('text-blue-600', entry.isIntersecting)
        const divIndicator = document.querySelector(`#page-div-indicator-${id}`)
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
    const observeds = document.querySelectorAll('.tema-section')
    observeds.forEach((element) => observer.observe(element))
  }

  static start () {
    ControllSubjectPage.fireIndicators()
    ControllSubjectPage.fireObserver()
  }
}

export default ControllSubjectPage
