const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const arePostsUniq = (posts) => {
  let uniqPostsIds = []

  return posts.every(post => {
    if (!uniqPostsIds.includes(post.id)) {
      uniqPostsIds.push(post.id)
    } else {
      return false
    }
    return true
  })
}

const arePostsSortedByKey = (posts, key, isAcsending) => {
  let previousValue = undefined

  return posts.every(post => {
    if (previousValue === undefined ||
      (isAcsending ? post[key] >= previousValue : post[key] <= previousValue)) {
      previousValue = post[key]
    } else {
      return false
    }
    return true
  })
}

/*** GET /api/ping ***/

describe('GET /api/ping', () => {
  it('should return 200',
    async function () {
      const response = await api
        .get('/api/ping')

      expect(response.status).toBe(200)
    })

  it('should return content-type "application/json"',
    async function () {
      const response = await api
        .get('/api/ping')

      expect(response.headers['content-type']).toContain('application/json')
    })

  it('should return "body.success" is true',
    async function () {
      const response = await api
        .get('/api/ping')

      expect(response.body['success']).toBe(true)
    })

})

/*** GET /api/posts ***/

describe('GET /api/posts', () => {
  it('should return 400',
    async function () {
      const response = await api
        .get('/api/posts')

      expect(response.status).toBe(400)
    })

  it('should return content-type "application/json"',
    async function () {
      const response = await api
        .get('/api/posts')

      expect(response.headers['content-type']).toContain('application/json')
    })

  it('should return "body.error" is "Tags parameter is required"',
    async function () {
      const response = await api
        .get('/api/posts')

      expect(response.body['error']).toBe('Tags parameter is required')
    })
})

describe('GET /api/posts?tags=science', () => {
  it('should return 200',
    async function () {
      const response = await api
        .get('/api/posts?tags=science')

      expect(response.status).toBe(200)
    })

  it('should return content-type "application/json"',
    async function () {
      const response = await api
        .get('/api/posts?tags=science')

      expect(response.headers['content-type']).toContain('application/json')
    })

  it('should return "body.posts" has array of posts',
    async function () {
      const response = await api
        .get('/api/posts?tags=science')

      expect(Array.isArray(response.body['posts'])).toBe(true)
    })
})

describe('GET /api/posts?tags=science,tech', () => {
  it('should return 200',
    async function () {
      const response = await api
        .get('/api/posts?tags=science,tech')

      expect(response.status).toBe(200)
    })

  it('should return content-type "application/json"',
    async function () {
      const response = await api
        .get('/api/posts?tags=science,tech')

      expect(response.headers['content-type']).toContain('application/json')
    })

  it('should return "body.posts" has uniq sorted by id(asc) array of posts',
    async function () {
      const response = await api
        .get('/api/posts?tags=science,tech')

      expect(Array.isArray(response.body['posts'])).toBe(true)
      expect(arePostsUniq(response.body['posts'])).toBe(true)
      const isAcsending = true
      const sortBy = 'id'
      expect(arePostsSortedByKey(response.body['posts'], sortBy, isAcsending)).toBe(true)
    })
})

describe('GET /api/posts?tags=science,tech&direction=desc', () => {
  it('should return 200',
    async function () {
      const response = await api
        .get('/api/posts?tags=science,tech&direction=desc')

      expect(response.status).toBe(200)
    })

  it('should return content-type "application/json"',
    async function () {
      const response = await api
        .get('/api/posts?tags=science,tech&direction=desc')

      expect(response.headers['content-type']).toContain('application/json')
    })

  it('should return "body.posts" has uniq sorted by id(desc) array of posts',
    async function () {
      const response = await api
        .get('/api/posts?tags=science,tech&direction=desc')

      expect(Array.isArray(response.body['posts'])).toBe(true)
      expect(arePostsUniq(response.body['posts'])).toBe(true)
      const isAcsending = false
      const sortBy = 'id'
      expect(arePostsSortedByKey(response.body['posts'], sortBy, isAcsending)).toBe(true)
    })
})

describe('GET /api/posts?tags=science,tech&sortBy=popularity&direction=asc', () => {
  it('should return 200',
    async function () {
      const response = await api
        .get('/api/posts?tags=science,tech&sortBy=popularity&direction=asc')

      expect(response.status).toBe(200)
    })

  it('should return content-type "application/json"',
    async function () {
      const response = await api
        .get('/api/posts?tags=science,tech&sortBy=popularity&direction=asc')

      expect(response.headers['content-type']).toContain('application/json')
    })

  it('should return "body.posts" has uniq sorted by popularity(asc) array of posts',
    async function () {
      const response = await api
        .get('/api/posts?tags=science,tech&sortBy=popularity&direction=asc')

      expect(Array.isArray(response.body['posts'])).toBe(true)
      expect(arePostsUniq(response.body['posts'])).toBe(true)
      const isAcsending = true
      const sortBy = 'popularity'
      expect(arePostsSortedByKey(response.body['posts'], sortBy, isAcsending)).toBe(true)
    })
})

describe('GET /api/posts?tags=science,tech&sortBy=popularity&direction=desc', () => {
  it('should return 200',
    async function () {
      const response = await api
        .get('/api/posts?tags=science,tech&sortBy=popularity&direction=desc')

      expect(response.status).toBe(200)
    })

  it('should return content-type "application/json"',
    async function () {
      const response = await api
        .get('/api/posts?tags=science,tech&sortBy=popularity&direction=desc')

      expect(response.headers['content-type']).toContain('application/json')
    })

  it('should return "body.posts" has uniq sorted by popularity(desc) array of posts',
    async function () {
      const response = await api
        .get('/api/posts?tags=science,tech&sortBy=popularity&direction=desc')

      expect(Array.isArray(response.body['posts'])).toBe(true)
      expect(arePostsUniq(response.body['posts'])).toBe(true)
      const isAcsending = false
      const sortBy = 'popularity'
      expect(arePostsSortedByKey(response.body['posts'], sortBy, isAcsending)).toBe(true)
    })
})

describe('GET /api/posts?tags=science,tech&sortBy=asdfghjkl', () => {
  it('should return 400',
    async function () {
      const response = await api
        .get('/api/posts?tags=science,tech&sortBy=asdfghjkl')

      expect(response.status).toBe(400)
    })

  it('should return content-type "application/json"',
    async function () {
      const response = await api
        .get('/api/posts?tags=science,tech&sortBy=asdfghjkl')

      expect(response.headers['content-type']).toContain('application/json')
    })

  it('should return "body.error" is "sortBy parameter is invalid"',
    async function () {
      const response = await api
        .get('/api/posts?tags=science,tech&sortBy=asdfghjkl')

      expect(response.body['error']).toBe('sortBy parameter is invalid')
    })
})

describe('GET /api/posts?tags=science,tech&direction=asdfghjkl', () => {
  it('should return 400',
    async function () {
      const response = await api
        .get('/api/posts?tags=science,tech&direction=asdfghjkl')

      expect(response.status).toBe(400)
    })

  it('should return content-type "application/json"',
    async function () {
      const response = await api
        .get('/api/posts?tags=science,tech&direction=asdfghjkl')

      expect(response.headers['content-type']).toContain('application/json')
    })

  it('should return "body.error" is "direction parameter is invalid"',
    async function () {
      const response = await api
        .get('/api/posts?tags=science,tech&direction=asdfghjkl')

      expect(response.body['error']).toBe('direction parameter is invalid')
    })
})