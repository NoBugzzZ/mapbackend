var express = require('express');
var router = express.Router();
var Gantry = require('../database/Gantry')
var Vehicle = require('../database/Vehicle')
var TrafficTransaction = require('../database/TrafficTransaction')

router.post('/gantries', function (req, res, next) {
  var { skip, limit } = req.query
  var { query } = req.body
  skip = skip ? parseInt(skip) : 0
  limit = limit ? parseInt(limit) : 10
  query = query ? query : {}
  skip = skip ? parseInt(skip) : 0
  Gantry.find(skip, limit, query).then(data => {
    res.send(data)
  })
});

router.post('/vehicles', function (req, res, next) {
  var { skip, limit } = req.query
  var { query } = req.body
  skip = skip ? parseInt(skip) : 0
  limit = limit ? parseInt(limit) : 10
  query = query ? query : {}
  Vehicle.find(skip, limit, query).then(data => {
    res.send(data)
  })
});

router.post('/traffictransactions', function (req, res, next) {
  var { skip, limit } = req.query
  var { query } = req.body
  skip = skip ? parseInt(skip) : 0
  limit = limit ? parseInt(limit) : 10
  query = query ? query : {}
  TrafficTransaction.find(skip, limit, query).then(data => {
    res.send(data)
  })
});

module.exports = router;
