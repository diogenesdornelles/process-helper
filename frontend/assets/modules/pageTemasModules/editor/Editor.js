import TEMPLATES from './templates'
import moveToTopElement from '../utils/moveToTopElement'
// eslint-disable-next-line no-undef, camelcase
import pt_BR from './pt_BR'

export default class Editor {
  static config () {
    // eslint-disable-next-line no-undef
    tinymce.init({
      selector: 'textarea#mytextareaeditor',
      language: 'pt_BR',
      // eslint-disable-next-line camelcase
      language_url: pt_BR,
      browser_spellcheck: true,
      contextmenu: false,
      plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
      toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
      tinycomments_mode: 'embedded',
      tinycomments_author: 'Author name',
      mergetags_list: [
        { value: 'First.Name', title: 'First Name' },
        { value: 'Email', title: 'Email' }
      ],
      height: 600,
      resize: 'both',
      init_instance_callback: (editor) => {
        const _editor = document.querySelector('.tox-tinymce')
        _editor.classList.add('m-auto')
        _editor.classList.add('w-8/12')
        Editor.getIframe()
      }
    })
  }

  static getIframe () {
    Editor.content = document.querySelector('#mytextareaeditor_ifr').contentDocument.querySelector('#tinymce')
    Editor.setQuadro()
  }

  static setQuadro () {
    Editor.content.innerHTML = TEMPLATES.quadro
    Editor.getConclusion()
  }

  static getConclusion () {
    Editor.conclusion = Editor.content.querySelector('#conclusao')
  }

  static centralize () {
    const btnEditor = document.querySelector('#dropdownDefaultButtonEditor')
    btnEditor.addEventListener('click', () => {
      setTimeout(() => {
        const dropper = document.querySelector('#dropdownEditor')
        moveToTopElement(dropper)
      }, 200)
    })
  }

  static async init () {
    Editor.config()
    Editor.centralize()
    Editor.hide()
  }
}
