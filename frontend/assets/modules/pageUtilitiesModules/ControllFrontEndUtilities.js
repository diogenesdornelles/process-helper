import TEMPLATES from './templates'
import weightedLogarithmicAverage from './weightedLogarithmicAverage'
import generateResult from './generateResult'

class ControllFrontEndUtilities {
  static prevent () {
    ControllFrontEndUtilities.btn = document.querySelector('#btn-send-info')
    ControllFrontEndUtilities.btn.addEventListener('click', (e) => e.preventDefault())
  }

  static addFields () {
    const inputsLi = document.querySelectorAll('.input-li')
    const lastInputLi = [...inputsLi].pop()
    lastInputLi.addEventListener('focus', () => {
      const table = document.querySelector('#table-measures')
      const div1 = document.createElement('div')
      div1.innerHTML = TEMPLATES.rowTi
      table.appendChild(div1)
      const div2 = document.createElement('div')
      div2.innerHTML = TEMPLATES.rowLi
      table.appendChild(div2)
      ControllFrontEndUtilities.addFields()
    }, { once: true })
  }

  static makeCalc () {
    ControllFrontEndUtilities.btn.addEventListener('click', () => {
      const inputsLi = document.querySelectorAll('.input-li')
      const inputsTi = document.querySelectorAll('.input-ti')
      const liValues = []
      const tiValues = []
      inputsLi.forEach(input => {
        liValues.push(Number(input.value * 60))
      })
      inputsTi.forEach(input => {
        tiValues.push(Number(input.value))
      })
      for (let i = 0; i < tiValues.length; i++) {
        if (!tiValues[i] || !liValues[i]) {
          tiValues.splice(i, 1)
          liValues.splice(i, 1)
        }
      }
      const avg = weightedLogarithmicAverage(tiValues, liValues)
      generateResult(avg, tiValues, liValues)
    })
  }

  static start () {
    ControllFrontEndUtilities.prevent()
    ControllFrontEndUtilities.addFields()
    ControllFrontEndUtilities.makeCalc()
  }
}

export default ControllFrontEndUtilities
