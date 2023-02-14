import Table from './Table'

export default function setBtnDelTable () {
  const btn = document.querySelector('.btn-delete-table')
  btn.addEventListener('click', () => {
    if (confirm('Deseja deletar a tabela?')) {
      const table = new Table()
      table.delete()
    }
  })
}
