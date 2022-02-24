const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

/*** GET /api/ping ***/

describe('GET /api/ping', () => {
  it('should return 200, content-type "application/json", "body.success" is true',
    async function () {
      const response = await api
        .get('/api/ping')

      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.body['success']).toBe(true)
    })
})

/*** GET /api/posts ***/

describe('GET /api/posts', () => {
  it('should return 400, content-type "application/json", "body.error" is "Tags parameter is required"',
    async function () {
      const response = await api
        .get('/api/posts')

      expect(response.status).toBe(400)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.body['error']).toBe('Tags parameter is required')
    })
})

describe('GET /api/posts?tags=science', () => {
  it('should return 200, content-type "application/json"',
    async function () {
      const response = await api
        .get('/api/posts?tags=science')

      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('application/json')
    })
})

describe('GET /api/posts?tags=science,tech&sortBy=asdfghjkl', () => {
  it('should return 400, content-type "application/json", "body.error" is "sortBy parameter is invalid"',
    async function () {
      const response = await api
        .get('/api/posts?tags=science,tech&sortBy=asdfghjkl')

      expect(response.status).toBe(400)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.body['error']).toBe('sortBy parameter is invalid')
    })
})

describe('GET /api/posts?tags=science,tech&direction=asdfghjkl', () => {
  it('should return 400, content-type "application/json", "body.error" is "direction parameter is invalid"',
    async function () {
      const response = await api
        .get('/api/posts?tags=science,tech&direction=asdfghjkl')

      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('application/json')
    })
})