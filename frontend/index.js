import 'core-js/stable'
import 'regenerator-runtime/runtime'
import './assets/css/style.css'
import './assets/css/styleHome.css'
import Controle from './assets/modules/Controle'
import Editor from './assets/modules/pageTemasModules/editor/Editor'
import ControllFrontEndAccordion from './assets/modules/pageTemasModules/ControllFrontEndAccordion'
import ControllFrontEndTema from './assets/modules/pageTemasModules/ControllFrontEndTema'
import ControllFrontEndTexto from './assets/modules/pageTemasModules/ControllFrontEndTexto'

window.onload = () => {
  if (window.location.pathname === '/controle') {
    new Controle().init()
  }
  if (window.location.pathname === '/tema') {
    Editor.init()
    ControllFrontEndAccordion.start()
    ControllFrontEndTema.start()
    ControllFrontEndTexto.start()
  }
}
