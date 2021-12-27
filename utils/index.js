var graphData = require('./graph.json')

function getNodes() {
  const { hex_pos } = graphData
  return hex_pos
}

// const { parse } = require('csv-parse')

// var fs = require('fs');

// function readCsv(callback) {
//   return fs.readFile('utils/final_1101-1107.csv', 'utf-8', function (err, data) {
//     if (err) {
//       console.log(err);
//     } else {
//       callback(data)
//     }
//   });
// }

// function parseCsv(records, weight, callback) {
//   const { min, max } = weight
//   let rowHeaders = []
//   let colHeaders = []
//   let edges = []
//   for (let i = 0; i < records.length; i++) {
//     for (let j = 0; j < records[i].length; j++) {
//       if (i === 0) {
//         if (j !== 0) {
//           rowHeaders.push(records[i][j])
//         }
//       } else {
//         if (j === 0) {
//           colHeaders.push(records[i][j])
//         } else {
//           const probability = new Number(records[i][j])
//           const target = colHeaders[i - 1]
//           const source = rowHeaders[j - 1]
//           if (min === 0) {
//             if (probability > min && probability <= max && source !== target) { //weight==0.1时，2300
//               edges.push({
//                 source, target, edgeWeight: probability
//               })
//             }
//           } else {
//             if (probability >= min && probability <= max && source !== target) { //weight==0.1时，2300
//               edges.push({
//                 source, target, edgeWeight: probability
//               })
//             }
//           }
//         }
//       }
//     }
//   }
//   callback(edges)
// }

// function getEdges(weight, callback) {
//   readCsv((data) => {
//     parse(data, {
//     }, function (err, records) {
//       parseCsv(records, weight, callback)
//     });
//   })
// }

const { parse } = require('csv-parse')

var fs = require('fs');

function readCsv(callback) {
  return fs.readFile('utils/final2_1101-1107-num.csv', 'utf-8', function (err, data) {
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
  readCsv((data) => {
    parse(data, {
    }, function (err, records) {
      parseCsv(records, weight, callback)
    });
  })
}

module.exports = {
  getNodes,
  getEdges,
}