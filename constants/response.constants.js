const status = {
  SUCCESS_CODE: 200,
  BAD_REQUEST_CODE: 400
}

const validation = {
  TAGS_MISSING_ERROR: 'Tags parameter is required',
  SORT_BY_INVALID_ERROR: 'sortBy parameter is invalid',
  DIRECTION_INVALID_ERROR: 'direction parameter is invalid'
}

module.exports = { status, validation }