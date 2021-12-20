const { parse } = require('csv-parse')

var fs = require('fs');

function readCsv(callback) {
  return fs.readFile('utils/final_1101-1107.csv', 'utf-8', function (err, data) {
    if (err) {
      console.log(err);
    } else {
      callback(data)
    }
  });
}

function parseCsv(records, weight, callback) {
  // console.log(records,weight)
  let rowHeaders = []
  let colHeaders = []
  let edges = []
  for (let i = 0; i < records.length; i++) {
    for (let j = 0; j < records[i].length; j++) {
      if (i === 0) {
        if (j !== 0) {
          rowHeaders.push(records[i][j])
        }
      } else {
        if (j === 0) {
          colHeaders.push(records[i][j])
        } else {
          const probability = new Number(records[i][j])
          const target = colHeaders[i - 1]
          const source = rowHeaders[j - 1]
          if (probability > weight && source !== target) { //weight==0.1时，2300
            edges.push({
              source, target, edgeWeight: probability
            })
          }
        }
      }
    }
  }
  // console.log(rowHeaders,rowHeaders.length,records[0].length)
  // console.log(colHeaders,colHeaders.length,records.length)
  // console.log(edges, edges.length)
  callback(edges)
}

function getEdges(weight, callback) {
  readCsv((data) => {
    parse(data, {
    }, function (err, records) {
      parseCsv(records, weight, callback)
    });
  })
}
// getEdges(0.1,(data)=>console.log(data))

var graphData = require('./graph.json')

function getNodes() {
  const { hex_pos } = graphData
  return hex_pos
}

// const nodes = getNodes()
// console.log(nodes)

module.exports = {
  getNodes,
  getEdges,
}