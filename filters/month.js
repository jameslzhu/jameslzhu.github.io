var _ = require('lodash')

function month(archive) {
  return _.groupBy(archive, (item) => item.date.getMonth())
}

module.exports = month