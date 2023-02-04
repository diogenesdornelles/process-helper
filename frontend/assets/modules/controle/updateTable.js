import Table from './Table'

export default async function updateTable () {
  const num = document.querySelector('#my-table').getAttribute('table-num')
  const tableId = document.querySelector('#table_id').value
  try {
    const table = new Table()
    await table.get(tableId, num)
    return
  } catch (e) { console.log(e) }
}
