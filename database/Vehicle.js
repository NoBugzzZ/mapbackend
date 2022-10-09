const { MongoClient } = require("mongodb");
const DB_URL = require("./config");

const uri = DB_URL;
const client = new MongoClient(uri);
let count = -1;

async function find(skip = 0, limit = 200, query = {}) {
  console.time("[Vehicle] connect")
  if (!client.isConnected()) await client.connect();
  console.timeEnd("[Vehicle] connect");

  console.time("[Vehicle] collection")
  const database = client.db("DigitalModel");
  const vehicle = database.collection("VehicleDigital");
  console.timeEnd("[Vehicle] collection")

  console.time("[Vehicle] find")
  const cursor = vehicle.find(query).limit(limit).skip(skip);
  console.timeEnd("[Vehicle] find");

  console.time("[Vehicle] toArray")
  const allValues = await cursor.toArray();
  console.timeEnd("[Vehicle] toArray")

  if (count < 0) {
    console.time("[Vehicle] count");
    vehicle.countDocuments().then(c => {
      count = c;
    })
    console.timeEnd("[Vehicle] count");
  }
  console.time("[Vehicle] estimatedDocumentCount");
  count = await vehicle.estimatedDocumentCount();
  console.timeEnd("[Vehicle] estimatedDocumentCount");
  return { items: allValues, skip: limit + skip, count };
}

// find(0, 200, {}).then(data => { console.log(data) })

module.exports = {
  find,
};
