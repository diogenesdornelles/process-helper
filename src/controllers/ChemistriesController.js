import fs from 'fs'
const PATH_NR15 = './src/json/nr15Anexo11Quimicos.json'

async function getData (path) {
  try {
    let data = await fs.promises.readFile(path)
    data = JSON.parse(data)
    return data
  } catch (e) { console.log(e) }
}

class ChemistriesController {
  async index (req, res) {
    try {
      const nr15data = await getData(PATH_NR15)
      return res.status(200).render('chemistries', { page: 'chemistries', nr15data })
    } catch (err) { console.log(err) }
  }
}

export default new ChemistriesController()
