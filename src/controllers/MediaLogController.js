class MediaLogController {
  async index (req, res) {
    try {
      return res.status(200).render('media-log', { page: 'media-log' })
    } catch (err) { console.log(err) }
  }
}

export default new MediaLogController()
