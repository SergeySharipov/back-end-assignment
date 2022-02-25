const { validSortBy, sortByDefault, validDirections, directionDefault } = require('../constants/request.constants')
const { status, validation } = require('../constants/response.constants')
const hatchwaysAPI = require('../api/hatchways')

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value)
}

const validateQueryParameters = (tags, sortBy, direction) => {
  // Handle tags required error
  if (!tags) {
    return validation.TAGS_MISSING_ERROR
  }
  // Handle sortBy is invalid error
  if (!getKeyByValue(validSortBy, sortBy)) {
    return validation.SORT_BY_INVALID_ERROR
  }
  // Handle direction is invalid error
  if (!getKeyByValue(validDirections, direction)) {
    return validation.DIRECTION_INVALID_ERROR
  }
}

const getPostsFromHatchwaysAPI = async (tags, sortBy, direction) => {
  const tagArr = tags.split(',')

  const postsPromises = tagArr.map(async (tag) => {
    const sourceData = await hatchwaysAPI.getPostsData(tag)
    const posts = sourceData.data.posts
    return posts
  })

  // eslint-disable-next-line no-undef
  const postsResults = await Promise.all(postsPromises)

  const uniqPosts =
    postsResults.length === 1 ? postsResults[0] : getUniqPosts(postsResults)

  const isSortAcsending = direction === validDirections.ASC
  const sortedPosts = uniqPosts.sort(sortByKeyCompFunc(sortBy, isSortAcsending))

  return sortedPosts
}

const sortByKeyCompFunc = (key, isAcsending) => {
  if (isAcsending) {
    return (p1, p2) => p1[key] - p2[key]
  } else {
    return (p1, p2) => p2[key] - p1[key]
  }
}

const getUniqPosts = (postsResults) => {
  let uniqPostsIds = []
  let uniqStructuredPosts = []

  postsResults.forEach(postsResult => {
    postsResult.forEach(post => {

      if (!uniqPostsIds.includes(post.id)) {
        uniqStructuredPosts.push(post)
        uniqPostsIds.push(post.id)
      }
    })
  })

  return uniqStructuredPosts
}

const postsController = {
  getPosts: async (req, res) => {
    const { tags, sortBy = sortByDefault, direction = directionDefault } = req.query

    const validationError = validateQueryParameters(tags, sortBy, direction)
    // Handle validation errors
    if (validationError) {
      res.status(status.BAD_REQUEST_CODE).json({ error: validationError })
      return
    }

    const allPosts = await getPostsFromHatchwaysAPI(tags, sortBy, direction)

    res.status(200).json({ posts: allPosts })
  }
}

module.exports = postsController