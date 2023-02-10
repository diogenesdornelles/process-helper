import ControllFrontEndAccordion from '../ControllFrontEndAccordion'
import ControllFrontEndTexto from '../ControllFrontEndTexto'
import ControllFrontEndTema from '../ControllFrontEndTema'

export default function reinitApp () {
  ControllFrontEndAccordion.start()
  ControllFrontEndTexto.start()
  ControllFrontEndTema.start()
}
