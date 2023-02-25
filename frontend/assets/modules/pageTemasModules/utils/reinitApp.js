import ControllFrontEndTema from '../ControllSubjectTema'
import ControllFrontEndAccordion from '../ControllSubjectAccordion'
import ControllFrontEndTexto from '../ControllSubjectTexto'
import scrollReveal from './scrollReveal'

export default function reinitApp () {
  ControllFrontEndAccordion.start()
  ControllFrontEndTexto.start()
  ControllFrontEndTema.start()
  scrollReveal()
}
