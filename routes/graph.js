var express = require('express');
var router = express.Router();
var { getNodes, getEdges } = require('../utils/index')
var GantryInfo = require('../database/GantryInfo')

router.get('/nodes', function (req, res, next) {
  // GantryInfo.find().then(data=>{
  //   let nodes={}
  //   data.forEach(d=>{
  //     const hexID=d['门架HEX字符串']
  //     const longitude=d['经度']
  //     const latitude=d['纬度']
  //     const flag=d['门架标志']===0?0:1
  //     nodes[hexID]=[longitude,latitude,flag]
  //   })
  //   res.send(nodes);
  // })
  getNodes((data) => {
    res.send(data)
  })
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
