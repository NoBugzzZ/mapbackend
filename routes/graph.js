var express = require('express');
var router = express.Router();
var { getNodes, getEdges } = require('../utils/index')

router.get('/nodes', function (req, res, next) {
  const nodes = getNodes()
  res.send(nodes);
});

router.post('/edges', function (req, res, next) {
  let { weight } = req.body
  weight = weight ? weight : {}
  if (!weight.hasOwnProperty('min')) {
    weight['min'] = 0.1
  }
  if (!weight.hasOwnProperty('max')) {
    weight['max'] = 1
  }
  console.log(weight)
  getEdges(weight, (data) => {
    res.send(data);
  })

});

module.exports = router;
