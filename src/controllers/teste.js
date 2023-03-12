// const fs = require('fs')

// const rawdata = fs.readFileSync('ACGIHQuimicos.json')
// let quimicos = JSON.parse(rawdata)

// function filter1 (item) {
//   if (item.length < 2) return false
//   return item
// }

// function filter2 (item, index) {
//   if (index === 0) return item
//   if (item) {
//     if (item.includes('TLV')) return item
//   }
//   return false
// }

// quimicos = quimicos.map(item => item.chemistry_info)

// quimicos = quimicos.filter(item => filter1(item))

// quimicos = quimicos.map(item => item.filter((item, index) => filter2(item, index)))

// // quimicos = quimicos.map(item => item.push('ACGIH'))

// const data = JSON.stringify(quimicos, null, 4)

// fs.writeFile('acghi.json', data, (err) => {
//   if (err) throw err
//   console.log('Data written to file')
// })

// console.log(quimicos)

const moment = require('moment')
moment().format('L')
moment.locale('pt-br')

// const date = moment('18/03/2011', 'DD-MM-YYYY')
// console.log(date)

const dates = ['01/05/1978', '05/08/1999']

const newDates = dates.map(date => {
  return date !== 'current' ? moment(date, 'DD-MM-YYYY') : 'current'
})

console.log(newDates)
