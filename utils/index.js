var graphData = require('./graph.json')

const { parse } = require('csv-parse')

var fs = require('fs');
var _ = require('lodash');

function readCsv(path, callback) {
  return fs.readFile(path, 'utf-8', function (err, data) {
    if (err) {
      console.log(err);
    } else {
      callback(data)
    }
  });
}

function parseCsv(records, weight, callback) {
  const { min, max } = weight
  let headers = []
  let edges = []
  for (let j = 1; j < records[0].length; j++) {
    headers.push(records[0][j])
  }
  for (let i = 1; i < records.length; i++) {
    const totalFlow = records[i][i]
    for (let j = 1; j < records[i].length; j++) {
      const flow = new Number(records[i][j])
      const rate = flow / totalFlow
      const source = headers[j - 1]
      const target = headers[i - 1]
      if (min === 0) {
        if (rate > min && rate <= max && source !== target) { //weight==0.1时，2300
          edges.push({
            source, target, edgeWeight: rate, flow
          })
        }
      } else {
        if (rate >= min && rate <= max && source !== target) { //weight==0.1时，2300
          edges.push({
            source, target, edgeWeight: rate, flow
          })
        }
      }
    }
  }
  callback(edges)
}

function getEdges(weight, callback) {
  readCsv('utils/final2_1101-1107-num.csv', (data) => {
    parse(data, {
    }, function (err, records) {
      parseCsv(records, weight, callback)
    });
  })
}

function parseGantryInfo(records,callback){
  let res={}
  let newRecords=_.cloneDeep(records)
  newRecords.splice(0,1)
  newRecords.forEach(record=>{
    const latitude=record[5]
    const longitude=record[6]
    const hexID=record[8]
    const type=record[10]
    res[hexID]=[
      longitude,
      latitude,
      type==="0"?0:1
    ]
  })
  callback(res)
}

function getNodes(callback) {
  readCsv('utils/NewGantryInfo.csv',(data) => {
    parse(data, {
    }, function (err, records) {
      parseGantryInfo(records,callback)
    });
  })
}

module.exports = {
  getNodes,
  getEdges,
}