export default function validateColumns (excelRows) {
  let columns
  let i = 0
  let maj
  excelRows.forEach((row, index) => {
    columns = Object.keys(row).length
    if (columns > i) {
      i = columns
      maj = index
    }
  })
  let headers = Object.keys(excelRows[maj]).sort()
  headers = headers.filter(item => item !== '__EMPTY')
  const necesseryHeaders = ['Assunto', 'Cls', 'Dias', 'Juízo', 'Localizador', 'Processos']
  if (headers.join('') !== necesseryHeaders.join('')) {
    console.log(headers)
    alert('Planilha deve conter as colunas: "Assunto", "Cls", "Dias", "Juízo", "Localizador", "Processos"')
    return false
  } else return true
}
