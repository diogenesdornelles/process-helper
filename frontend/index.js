import 'core-js/stable'
import 'regenerator-runtime/runtime'
import './assets/css/input.css'
import './assets/css/style.css'
import Controle from './assets/modules/pageControleModules/Controle'
import ControllFrontEndAccordion from './assets/modules/pageTemasModules/ControllFrontEndAccordion'
import ControllFrontEndTema from './assets/modules/pageTemasModules/ControllFrontEndTema'
import ControllFrontEndTexto from './assets/modules/pageTemasModules/ControllFrontEndTexto'
import Editor from './assets/modules/pageTemasModules/editor/Editor'
import ControllFrontEndUtilities from './assets/modules/pageUtilitiesModules/ControllFrontEndUtilities'

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
  if (window.location.pathname === '/utilidades') {
    ControllFrontEndUtilities.start()
  }
}
