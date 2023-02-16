import 'core-js/stable'
import 'regenerator-runtime/runtime'
import './assets/css/input.css'
import './assets/css/style.css'
import Controle from './assets/modules/pageControleModules/Controle'
import ControllSubjectAccordion from './assets/modules/pageTemasModules/ControllSubjectAccordion'
import ControllSubjectEditor from './assets/modules/pageTemasModules/ControllSubjectEditor'
import ControllSubjectPage from './assets/modules/pageTemasModules/ControllSubjectPage'
import ControllSubjectTema from './assets/modules/pageTemasModules/ControllSubjectTema'
import ControllSubjectTexto from './assets/modules/pageTemasModules/ControllSubjectTexto'
import ControllSubjectUtilities from './assets/modules/pageTemasModules/ControllSubjectUtilities'

window.onload = () => {
  if (window.location.pathname === '/controle') {
    new Controle().init()
  }
  if (window.location.pathname === '/tema') {
    ControllSubjectEditor.start()
    ControllSubjectAccordion.start()
    ControllSubjectTema.start()
    ControllSubjectTexto.start()
    ControllSubjectPage.start()
  }
  if (window.location.pathname === '/utilidades') {
    ControllSubjectUtilities.start()
  }
}
