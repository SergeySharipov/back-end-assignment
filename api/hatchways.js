const axios = require('axios')
const cachios = require('cachios')
const { HATCHWAYS_API_URL } = require('../constants/hatchways.constants')

const axiosInstance = axios.create({
  baseURL: HATCHWAYS_API_URL
})

const api = cachios.create(axiosInstance)

// Send a GET request to hatchways REST API, cache duration 10s
const getPostsData = async (tag) => api.get('/assessment/blog/posts', { ttl: 10, params: { tag: tag } })

module.exports = { getPostsData }