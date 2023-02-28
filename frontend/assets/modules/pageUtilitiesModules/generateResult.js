export default async function generateResult (avg, tiValues, liValues) {
  let tableResult = '<table id="table-avg-noise" class="w-full text-sm text-left text-gray-500"><thead class="text-xs text-gray-700 uppercase bg-gray-50"><tr><th scope="col" class="px-6 py-3">Nº</th><th scope="col" class="px-6 py-3">Intensidade (dB(A))</th><th scope="col" class="px-6 py-3">Tempo de exposição (min./dia)</th></thead><tbody>'
  for (let i = 0; i < tiValues.length; i++) {
    tableResult += `<tr class="bg-white border-b"><th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${i + 1}</th><td class="px-6 py-4">${tiValues[i]} dB(A)</td><td class="px-6 py-4">${liValues[i] / 60} min.</td></tr>`
  }
  tableResult += '</tbody>'
  tableResult += `<tfoot><th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Resultado</th><th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${avg} dB(A)</th></tfoot>`
  tableResult += '<table>'
  tableResult += '<button id="export-pdf-btn" class="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-32 self-center">Gerar PDF</button>'
  const result = document.querySelector('#result-container-avg')
  result.innerHTML += tableResult
}
