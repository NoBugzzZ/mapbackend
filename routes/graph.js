var express = require('express');
var router = express.Router();
var {getNodes,getEdges}=require('../utils/index')

router.get('/nodes', function(req, res, next) {
  const nodes=getNodes()
  res.send(nodes);
});

router.get('/edges', function(req, res, next) {
  let {weight} = req.query
  console.log(weight)
  weight=weight?parseFloat(weight):0.1
  getEdges(weight,(data)=>{
    res.send(data);
  })

});

module.exports = router;
