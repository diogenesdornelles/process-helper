import getTableFromExcel from './getTableFromExcel'

export default function uploadProcess (file) {
  const regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/
  if (regex.test(file.name.toLowerCase())) {
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader()
      // For Browsers other than IE.
      if (reader.readAsBinaryString) {
        reader.onload = function (event) {
          getTableFromExcel(event.target.result)
        }
        reader.readAsBinaryString(file)
      } else {
        // For IE Browser.
        reader.onload = function (event) {
          let data = ''
          const bytes = new Uint8Array(event.target.result)
          for (let i = 0; i < bytes.byteLength; i++) {
            data += String.fromCharCode(bytes[i])
          }
          getTableFromExcel(data)
        }
        reader.readAsArrayBuffer(file)
      }
    } else {
      alert('This browser does not support HTML5.')
    }
  } else {
    alert('Por favor faça um upload de um arquivo excel válido.')
  }
}
