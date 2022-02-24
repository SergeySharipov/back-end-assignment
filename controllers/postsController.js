const postsController = {
  getPosts: async (req, res) => {
    res.status(200).json({ success: true })
  }
}

module.exports = postsController