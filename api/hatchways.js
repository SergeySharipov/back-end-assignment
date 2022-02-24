const axios = require('axios')
const { HATCHWAYS_API_URL } = require('../constants/hatchways.constants')

const api = axios.create({
  url: HATCHWAYS_API_URL
})

// Send a GET request to hatchways REST API
const getPostsData = async (tag) => api.get(HATCHWAYS_API_URL + '/assessment/blog/posts', { params: { tag: tag } })

module.exports = { getPostsData }