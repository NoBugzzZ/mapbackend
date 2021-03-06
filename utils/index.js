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

// function parseCsv(records, weight, callback) {
//   const { min, max } = weight
//   let headers = []
//   let edges = []
//   for (let j = 1; j < records[0].length; j++) {
//     headers.push(records[0][j])
//   }
//   for (let i = 1; i < records.length; i++) {
//     const totalFlow = records[i][i]
//     for (let j = 1; j < records[i].length; j++) {
//       const flow = new Number(records[i][j])
//       const rate = flow / totalFlow
//       const source = headers[j - 1]
//       const target = headers[i - 1]
//       if (min === 0) {
//         if (rate > min && rate <= max && source !== target) { //weight==0.1时，2300
//           edges.push({
//             source, target, edgeWeight: rate, flow
//           })
//         }
//       } else {
//         if (rate >= min && rate <= max && source !== target) { //weight==0.1时，2300
//           edges.push({
//             source, target, edgeWeight: rate, flow
//           })
//         }
//       }
//     }
//   }
//   callback(edges)
// }

// function getEdges(weight, callback) {
//   readCsv('utils/final2_1101-1107-num.csv', (data) => {
//     parse(data, {
//     }, function (err, records) {
//       parseCsv(records, weight, callback)
//     });
//   })
// }


function getEdges(weight, callback) {
  readCsv('utils/file.csv', (data) => {
    parse(data, {
    }, function (err, records) {
      const { min, max } = weight
      let edges = []
      for (let i = 1; i < records.length; i++) {
        for (let j = 0; j < records[i].length; j++) {
          const source = records[i][0]
          const target = records[i][1]
          const flow = parseInt(records[i][2])
          const total = parseInt(records[i][3])
          const rate = flow / total
          if (rate >= min && rate <= max && source !== target) { //weight==0.1时，2300
            edges.push({
              source, target, edgeWeight: rate, flow
            })
          }
        }
      }
      callback(edges)
    });
  })
}

function parseGantryInfo(records, callback) {
  let res = {}
  let newRecords = _.cloneDeep(records)
  newRecords.splice(0, 1)
  newRecords.forEach(record => {
    const latitude = record[9]
    const longitude = record[10]
    const hexID = record[15]
    const type = record[5]
    const status = record[12]
    if (status !== '停用') {
      res[hexID] = [
        longitude,
        latitude,
        type === "0" ? 0 : 1
      ]
    }
  })
  callback(res)
}

function getNodes(callback) {
  readCsv('utils/GantryInfo.csv', (data) => {
    parse(data, {
    }, function (err, records) {
      parseGantryInfo(records, callback)
    });
  })
}

const simplepaireData = require('./simlpepair.json')

function getSimplepaire() {
  let res = []
  simplepaireData.forEach(value => {
    const source = value['起始门架HEX']
    const target = value['下游门架HEX']
    res.push({ source, target })
  })
  return res
}

module.exports = {
  getNodes,
  getEdges,
  getSimplepaire,
  readCsv
}