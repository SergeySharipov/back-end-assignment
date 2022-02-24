const { validSortBy, sortByDefault, validDirections, directionDefault } = require('../constants/request.constants')
const { status, validation } = require('../constants/response.constants')
const hatchwaysAPI = require('../api/hatchways')

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value)
}

const validateQueryParameters = (tags, sortBy) => {
  // Handle tags required error
  if (!tags) {
    return validation.TAGS_MISSING_ERROR
  }
  // Handle sortBy is invalid error
  if (!getKeyByValue(validSortBy, sortBy)) {
    return validation.SORT_BY_INVALID_ERROR
  }
}

const getPostsFromHatchwaysAPI = async (tags) => {
  const tagArr = tags.split(',')

  const postsPromises = tagArr.map(async (tag) => {
    const sourceData = await hatchwaysAPI.getPostsData(tag)
    const posts = sourceData.data.posts
    return posts
  })

  // eslint-disable-next-line no-undef
  const postsPromisesResult = await Promise.all(postsPromises)

  let allPosts = []
  postsPromisesResult.forEach(element => allPosts.push(...element))

  return allPosts
}

const postsController = {
  getPosts: async (req, res) => {
    const { tags, sortBy = sortByDefault } = req.query
    let direction = req.query.direction

    // Handle invalid direction by using default value
    if (!direction || !getKeyByValue(validDirections, direction)) {
      direction = directionDefault
    }

    const validationError = validateQueryParameters(tags, sortBy)
    // Handle validation errors
    if (validationError) {
      res.status(status.BAD_REQUEST_CODE).json({ error: validationError })
      return
    }

    const allPosts = await getPostsFromHatchwaysAPI(tags)

    res.status(200).json({ posts: allPosts })
  }
}

module.exports = postsController