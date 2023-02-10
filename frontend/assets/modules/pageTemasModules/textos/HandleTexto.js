import Editor from '../editor/Editor'
import texto from './Texto'
import tema from '../temas/Tema'
import ControllFrontEndTexto from '../ControllFrontEndTexto'
import reinitApp from '../utils/reinitApp'

class HandleTexto {
  async copy (el) {
    const texto = el.parentNode.parentNode.querySelector('TEXTAREA').value
    navigator.clipboard.writeText(texto)
    Editor.conclusion.innerHTML += `<br>${texto}`
  }

  async result (el) {
    const texto = el.parentNode.querySelector('.my-result-texto').textContent
    navigator.clipboard.writeText(texto)
    Editor.conclusion.innerHTML += `<br>${texto}`
  }

  async save (temaId) {
    try {
      if (texto.validate()) {
        const data = await texto.save(temaId)
        if (data) {
          alert('Texto salvo!')
          document.querySelector('#accordion-container').innerHTML = data
          document.querySelector('#form-new-texto').classList.remove('flex')
          document.querySelector('#form-new-texto').classList.add('hidden')
          document.querySelector('#new-texto-description').value = ''
          document.querySelector('#new-texto-content').value = ''
          reinitApp()
        }
      } else {
        alert('Enviar dados completos!')
      }
    } catch (e) { console.log(e) }
  }

  async update (el) {
    try {
      const textoId = el.getAttribute('texto-id')
      const temaId = el.getAttribute('tema-id')
      const response = await texto.update(textoId, temaId)
      if (response) {
        const data = await tema.getAll()
        if (data) {
          document.querySelector('#accordion-container').innerHTML = data
          alert('Texto atualizado!')
          reinitApp()
        }
      } else {
        return
      }
    } catch (err) { console.log(err) }
  }

  async delete (el) {
    try {
      const textoId = el.getAttribute('texto-id')
      const response = await texto.delete(textoId)
      if (response) {
        const data = await tema.getAll()
        if (data) {
          document.querySelector('#accordion-container').innerHTML = data
          alert('Texto deletado!')
          reinitApp()
        }
      } else {
        return
      }
    } catch (e) { console.log(e) }
  }

  async search (content, juizo, type) {
    try {
      if (!content) {
        document.querySelector('#search-result').innerHTML = ''
        return
      }
      const result = await texto.show(content, juizo, type)
      if (result) {
        document.querySelector('#search-result').innerHTML = result
        ControllFrontEndTexto.fireCopyResult()
      } else {
        document.querySelector('#search-result').innerHTML = ''
      }
    } catch (e) { console.log(e) }
  }
}

export default new HandleTexto()
