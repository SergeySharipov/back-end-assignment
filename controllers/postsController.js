const sortByArr = ['id', 'reads', 'likes', 'popularity']
const sortByDefault = 'id'

const postsController = {
  getPosts: async (req, res) => {
    const { tags, sortBy = sortByDefault, direction } = req.query

    if (!tags) {
      res.status(400).json({ error: 'Tags parameter is required' })
      return
    }

    if (!sortByArr.includes(sortBy)) {
      res.status(400).json({ error: 'sortBy parameter is invalid' })
      return
    }

    res.status(200).json({ tags, sortBy, direction })
  }
}

module.exports = postsController