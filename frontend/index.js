import 'core-js/stable'
import 'regenerator-runtime/runtime'
import './assets/css/style.css'
import './assets/css/styleHome.css'
import Controle from './assets/modules/Controle'
import Temas from './assets/modules/Temas'
import Textos from './assets/modules/Textos'
import Editor from './assets/modules/Editor'

window.onload = () => {
  if (window.location.pathname === '/controle') {
    const controle = new Controle()
    controle.init()
  }
  if (window.location.pathname === '/tema') {
    Editor.init()
    Temas.accordionStart()
    Temas.init()
    Textos.init()
  }
}
