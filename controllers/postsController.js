const postsController = {
  getPosts: async (req, res) => {
    const { tags, sortBy, direction } = req.query

    res.status(200).json({ tags, sortBy, direction })
  }
}

module.exports = postsController