import generateResult from '../pageUtilitiesModules/generateResult'
import TEMPLATES from '../pageUtilitiesModules/templates'
import weightedLogarithmicAverage from '../pageUtilitiesModules/weightedLogarithmicAverage'

class ControllSubjectUtilities {
  static prevent () {
    ControllSubjectUtilities.btn = document.querySelector('#btn-send-info')
    ControllSubjectUtilities.btn.addEventListener('click', (e) => e.preventDefault())
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
      ControllSubjectUtilities.addFields()
    }, { once: true })
  }

  static makeCalc () {
    ControllSubjectUtilities.btn.addEventListener('click', () => {
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
    ControllSubjectUtilities.prevent()
    ControllSubjectUtilities.addFields()
    ControllSubjectUtilities.makeCalc()
  }
}

export default ControllSubjectUtilities
