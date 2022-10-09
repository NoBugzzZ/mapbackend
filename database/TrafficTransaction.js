const { MongoClient } = require("mongodb");
const DB_URL = require("./config");

const uri = DB_URL
const client = new MongoClient(uri);
let count = -1;

async function find(skip = 0, limit = 200, query = {}) {
  // console.time("[TrafficTransaction] connect")
  if (!client.isConnected()) await client.connect();
  // console.timeEnd("[TrafficTransaction] connect")

  // console.time("[TrafficTransaction] collection")
  const database = client.db('EntityModel');
  const trafficTransaction = database.collection('TrafficTransaction');
  // console.timeEnd("[TrafficTransaction] collection")

  // console.time("[TrafficTransaction] find")
  const cursor = trafficTransaction.find(query).limit(limit).skip(skip);
  // console.timeEnd("[TrafficTransaction] find")

  // console.time("[TrafficTransaction] toArray")
  const allValues = await cursor.toArray();
  // console.timeEnd("[TrafficTransaction] toArray")

  if (count < 0) {
    // console.time("[TrafficTransaction] count")
    trafficTransaction.countDocuments().then(c => {
      count = c;
    });
    // console.timeEnd("[TrafficTransaction] count")
  }
  // console.time("[TrafficTransaction] estimatedDocumentCount");
  count = await trafficTransaction.estimatedDocumentCount();
  // console.timeEnd("[TrafficTransaction] estimatedDocumentCount");
  return { items: allValues, skip: limit + skip, count }
}

// find(0, 200, {}).then(data => { console.log(data) })

module.exports = {
  find,
}