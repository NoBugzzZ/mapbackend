const { parse } = require('csv-parse')
const { readCsv } = require('./index')

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: './file.csv',
  header: [
    { id: 'source', title: 'source' },
    { id: 'target', title: 'target' },
    { id: 'flow', title: 'flow' },
    { id: 'total', title: 'total' },
  ]
});

function transform() {
  readCsv('./final2_1101-1107-num.csv', (data) => {
    parse(data, {
    }, function (err, records) {
      let headers = []
      for (let j = 1; j < records[0].length; j++) {
        headers.push(records[0][j])
      }
      let edges = []
      for (let i = 1; i < records.length; i++) {
        const totalFlow = parseInt(records[i][i])
        for (let j = 1; j < records[i].length; j++) {
          if (i !== j) {
            const flow = parseInt(records[i][j])
            if (flow !== 0) {
              // const rate = flow / totalFlow
              const source = headers[j - 1]
              const target = headers[i - 1]
              edges.push({ source, target, flow, total:totalFlow })
            }
          }
        }
      }
      csvWriter.writeRecords(edges)       // returns a promise
        .then(() => {
          console.log('...Done');
        });
    });
  })
}

transform()