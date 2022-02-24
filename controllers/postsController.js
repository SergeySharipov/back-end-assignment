const sortByArr = ['id', 'reads', 'likes', 'popularity']
const sortByDefault = 'id'

const directionsArr = ['asc', 'desc']
const directionDefault = 'asc'

const postsController = {
  getPosts: async (req, res) => {
    const { tags, sortBy = sortByDefault } = req.query
    let { direction = directionDefault } = req.query
    // Handle tags required error
    if (!tags) {
      res.status(400).json({ error: 'Tags parameter is required' })
      return
    }
    // Handle sortBy is invalid error
    if (!sortByArr.includes(sortBy)) {
      res.status(400).json({ error: 'sortBy parameter is invalid' })
      return
    }
    // Handle direction is invalid by using default value
    if (!directionsArr.includes(direction)) {
      direction = directionDefault
    }

    res.status(200).json({ tags, sortBy, direction })
  }
}

module.exports = postsController