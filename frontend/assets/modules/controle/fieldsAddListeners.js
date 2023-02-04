import Processo from './Processo'

export default function fieldsAddListeners () {
  const siglasSelected = document.querySelectorAll('.select-sigla')
  siglasSelected.forEach(selectEl => {
    selectEl.addEventListener('change', (e) => {
      Processo.updateSigla(e.target)
    })
  })
  const statusSelected = document.querySelectorAll('.select-status')
  statusSelected.forEach(selectEl => {
    selectEl.addEventListener('change', (e) => {
      Processo.updateStatus(e.target)
    })
  })
  const comentariosSelected = document.querySelectorAll('.select-comentario')
  comentariosSelected.forEach(selectEl => {
    selectEl.addEventListener('click', (e) => {
      Processo.updateComentario(e.target)
    })
  })
  const deleteProcessosSelected = document.querySelectorAll('.select-deletar-processo')
  deleteProcessosSelected.forEach(selectEl => {
    selectEl.addEventListener('click', (e) => {
      Processo.delete(e.target)
    })
  })
}
