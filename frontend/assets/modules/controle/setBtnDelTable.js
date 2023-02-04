import Table from './Table'

export default function setBtnDelTable () {
  const btn = document.querySelector('.btn-delete-table')
  btn.addEventListener('click', () => {
    const table = new Table()
    table.delete()
  })
}
