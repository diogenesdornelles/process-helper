import moveToTopElement from './utils/moveToTopElement'

class ControllSubjectPageTema {
  static firePageSectionIndicators () {
    const indicators = [...document.querySelectorAll('.select-page-indicator')]
    const sections = [...document.querySelectorAll('.tema-section')]
    indicators.forEach(indicator => {
      indicator.addEventListener('click', (e) => {
        const index = indicators.indexOf(e.target)
        moveToTopElement(sections[index])
      })
    })
  }

  static start () {
    ControllSubjectPageTema.firePageSectionIndicators()
  }
}

export default ControllSubjectPageTema
