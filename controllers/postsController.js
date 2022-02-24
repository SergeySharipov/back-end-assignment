const postsController = {
  getPosts: async (req, res) => {
    const { tags, sortBy, direction } = req.query

    if (!tags) {
      res.status(400).json({ error: 'Tags parameter is required' })
      return
    }

    res.status(200).json({ tags, sortBy, direction })
  }
}

module.exports = postsController