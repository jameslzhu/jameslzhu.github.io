var _ = require('lodash')

function yearHeight(months, lineHeight) {
  return lineHeight * _.reduce(months, (memo, month) => memo + month.length, 0)
}

module.exports = yearHeight
