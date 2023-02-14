const fs = require('fs')

const rawdata = fs.readFileSync('ACGIHQuimicos.json')
let quimicos = JSON.parse(rawdata)

function filter1 (item) {
  if (item.length < 2) return false
  return item
}

function filter2 (item, index) {
  if (index === 0) return item
  if (item) {
    if (item.includes('TLV')) return item
  }
  return false
}

quimicos = quimicos.map(item => item.chemistry_info)

quimicos = quimicos.filter(item => filter1(item))

quimicos = quimicos.map(item => item.filter((item, index) => filter2(item, index)))

// quimicos = quimicos.map(item => item.push('ACGIH'))

const data = JSON.stringify(quimicos, null, 4)

fs.writeFile('acghi.json', data, (err) => {
  if (err) throw err
  console.log('Data written to file')
})

console.log(quimicos)
