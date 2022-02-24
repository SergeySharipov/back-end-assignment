const validSortBy = {
  ID: 'id',
  READS: 'reads',
  LIKES: 'likes',
  POPULARITY: 'popularity'
}

const sortByDefault = validSortBy.ID

const validDirections = {
  ASC: 'asc',
  DESC: 'desc'
}

const directionDefault = validDirections.ASC

module.exports = { validSortBy, sortByDefault, validDirections, directionDefault }