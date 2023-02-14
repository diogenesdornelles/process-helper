import Processo from './Processo'
import Table from './Table'

export default async function saveTableDB (excelRows) {
  const errors = []
  const table = new Table()
  excelRows.forEach(row => {
    const processo = new Processo(row.Juízo, row.Assunto, row.Cls, row.Localizador, row.Dias, row.Processos)
    if (processo.validate()) {
      table.repository.push(processo.data)
    } else {
      errors.push(row.Processos)
    }
  })
  try {
    if (table.repository.length > 0) {
      await table.save()
    } else {
      alert('Planilha está vazia!')
    }
  } catch (e) { console.log(e) }

  if (errors.length > 0) {
    let text = 'Alguns processos não puderam ser salvos: \n'
    text = errors.join('\n')
    alert(text)
  }
}
