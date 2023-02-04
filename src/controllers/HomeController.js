class HomeController {
  async index (req, res) {
    return res.status(200).render('index', { page: 'home' })
  }
}

export default new HomeController()
