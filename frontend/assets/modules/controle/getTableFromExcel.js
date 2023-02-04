import validateColumns from './validateColumns'
import saveTableDB from './saveTableDB'

export default function getTableFromExcel (data) {
  // eslint-disable-next-line no-undef
  const workbook = XLSX.read(data, {
    type: 'binary'
  })
  const sheet = workbook.SheetNames[0]
  // eslint-disable-next-line no-undef
  const excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet])
  if (validateColumns(excelRows)) {
    saveTableDB(excelRows)
  }
}
