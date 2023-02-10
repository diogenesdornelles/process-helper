import moveToTopElement from './utils/moveToTopElement'
import textareaAutoExpand from './utils/textareaAutoExpand'

export default class ControllFrontEndAccordion {
  static accordionOptions = {
    alwaysOpen: false,
    activeClasses: 'bg-blue-600 hover:bg-blue-800 text-white border-blue-800 focus:ring-blue-200',
    inactiveClasses: 'bg-gray-100 hover:bg-gray-200 text-black border-gray-200 focus:ring-gray-300',
    onOpen: (item) => {
      item._items.forEach(item => {
        const btn = document.querySelector(`#${item.id}`)
        const lbl = btn.querySelector('LABEL')
        if (item.active) {
          lbl.classList.remove('text-gray-900')
          lbl.classList.add('text-white')
        } else {
          lbl.classList.add('text-gray-900')
          lbl.classList.remove('text-white')
        }
      })
    },
    onClose: (item) => {},
    onToggle: (item) => {}
  }

  static getItemsAccordion () {
    const headers = document.querySelectorAll('.accordion-heading')
    const bodies = document.querySelectorAll('.accordion-body')
    for (let i = 0; i < headers.length; i++) {
      if (!i) {
        ControllFrontEndAccordion.accordionItems.push({
          id: headers[i].getAttribute('id'),
          triggerEl: document.querySelector(`#${headers[i].getAttribute('id')}`),
          targetEl: document.querySelector(`#${bodies[i].getAttribute('id')}`),
          active: true
        })
      } else {
        ControllFrontEndAccordion.accordionItems.push({
          id: headers[i].getAttribute('id'),
          triggerEl: document.querySelector(`#${headers[i].getAttribute('id')}`),
          targetEl: document.querySelector(`#${bodies[i].getAttribute('id')}`),
          active: false
        })
      }
    }
  }

  static fireAccordion () {
    // eslint-disable-next-line no-undef
    ControllFrontEndAccordion.accordion = new Accordion(ControllFrontEndAccordion.accordionItems, ControllFrontEndAccordion.accordionOptions)
    const headers = document.querySelectorAll('.accordion-heading')
    headers.forEach(header => {
      header.addEventListener('click', (el) => {
        ControllFrontEndAccordion.accordion.open(`${el.target.getAttribute('id')}`)
        textareaAutoExpand()
        setTimeout(() => {
          moveToTopElement(el.target)
        }, 200)
      })
    })
  }

  static start () {
    ControllFrontEndAccordion.accordionItems = []
    ControllFrontEndAccordion.getItemsAccordion()
    ControllFrontEndAccordion.fireAccordion()
  }
}
