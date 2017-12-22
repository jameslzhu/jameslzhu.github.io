var _ = require('lodash')

function year(articles) {
  return _.groupBy(articles, (item) => item.date.getFullYear())
}

module.exports = year