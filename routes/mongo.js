var express = require('express');
var router = express.Router();
var Gantry = require('../database/Gantry')
var Vehicle = require('../database/Vehicle')

/* GET users listing. */
router.get('/gantry', function (req, res, next) {
  var { skip } = req.query
  skip=skip?parseInt(skip):0
  Gantry.find(skip).then(data => {
    res.send(data)
  })
});

router.get('/vehicle', function (req, res, next) {
  var { skip } = req.query
  skip=skip?parseInt(skip):0
  Vehicle.find(skip).then(data => {
    res.send(data)
  })
});

module.exports = router;
