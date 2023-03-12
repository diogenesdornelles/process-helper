import Editor from '../ControllSubjectEditor'
import ControllSubjectTexto from '../ControllSubjectTexto'
import tema from '../temas/Tema'
import reinitApp from '../utils/reinitApp'
import texto from './Texto'
import { setOriginal, hideTemaSearch } from '../utils/controllPageState'
import moveToTopElement from '../utils/moveToTopElement'
import { setBackdropLoad, removeBackdropLoad } from '../utils/backdropLoad'

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

  async save (temaId, modal, el, header, type) {
    try {
      if (texto.validate(type)) {
        await setBackdropLoad(ControllSubjectTexto.backdrop)
        const data = await texto.save(temaId)
        if (data) {
          document.querySelector('#accordion-container').innerHTML = data
          document.querySelector('#new-texto-description').value = ''
          document.querySelector('#new-texto-content').value = ''
          reinitApp()
          modal.close()
          header.click()
          moveToTopElement(header)
          moveToTopElement(el)
          await removeBackdropLoad(ControllSubjectTexto.backdrop)
          return true
        }
      } else {
        alert('Enviar dados completos!')
        return false
      }
    } catch (e) { console.log(e) }
  }

  async update (el) {
    try {
      const textoId = el.getAttribute('texto-id')
      const temaId = el.getAttribute('tema-id')
      await setBackdropLoad(ControllSubjectTexto.backdrop)
      const response = await texto.update(textoId, temaId)
      if (response) {
        document.querySelector('#_third-csrf').innerHTML = response
      } else {
        return false
      }
      await removeBackdropLoad(ControllSubjectTexto.backdrop)
    } catch (err) { console.log(err) }
  }

  async delete (el) {
    try {
      const textoId = el.getAttribute('texto-id')
      await setBackdropLoad(ControllSubjectTexto.backdrop)
      const response = await texto.delete(textoId)
      if (response) {
        const data = await tema.getAll()
        if (data) {
          document.querySelector('#accordion-container').innerHTML = data
          reinitApp()
        }
      } else {
        return
      }
      await removeBackdropLoad(ControllSubjectTexto.backdrop)
    } catch (e) { console.log(e) }
  }

  async search (content, juizo, type, tema) {
    try {
      if (!content) {
        setOriginal()
        return
      }
      const result = await texto.show(content, juizo, type, tema)
      if (result) {
        hideTemaSearch()
        const highlighted = result.replace(new RegExp(content, 'gi'), '<mark>$&</mark>')
        document.querySelector('#search-result').innerHTML = highlighted
        ControllSubjectTexto.fireCopyResult()
      } else {
        setOriginal()
      }
    } catch (e) { console.log(e) }
  }
}

export default new HandleTexto()
