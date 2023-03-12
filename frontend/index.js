import 'core-js/stable'
import 'regenerator-runtime/runtime'
import './assets/css/input.css'
import './assets/css/style.css'
import scrollReveal from './assets/modules/pageTemasModules/utils/scrollReveal'
import Controle from './assets/modules/pageControleModules/Controle'
import ControllSubjectAccordion from './assets/modules/pageTemasModules/ControllSubjectAccordion'
import ControllSubjectEditor from './assets/modules/pageTemasModules/ControllSubjectEditor'
import ControllSubjectPageTema from './assets/modules/pageTemasModules/ControllSubjectPageTema'
import ControllSubjectTema from './assets/modules/pageTemasModules/ControllSubjectTema'
import ControllSubjectTexto from './assets/modules/pageTemasModules/ControllSubjectTexto'
import ControllSubjectUtilities from './assets/modules/pageTemasModules/ControllSubjectUtilities'

window.onload = () => {
  if (window.location.pathname === '/controle') {
    new Controle().init()
  }
  if (window.location.pathname === '/tema') {
    scrollReveal()
    ControllSubjectEditor.start()
    ControllSubjectAccordion.start()
    ControllSubjectTema.start()
    ControllSubjectTexto.start()
    ControllSubjectPageTema.start()
  }
  if (window.location.pathname === '/media-logaritmica') {
    ControllSubjectUtilities.start()
  }
}
