const { MongoClient } = require("mongodb");
const DB_URL = require("./config");

const uri = DB_URL;
const client = new MongoClient(uri);
let count = -1;

async function find(skip = 0, limit = 200, query = {}) {
  if (!client.isConnected()) await client.connect();
  const database = client.db("DigitalModel");
  const vehicle = database.collection("VehicleDigital");
  // console.time("find")
  const cursor = vehicle.find(query).limit(limit).skip(skip);
  // console.timeEnd("find");
  // console.time("toArray")
  const allValues = await cursor.toArray();
  // console.timeEnd("toArray")
  // console.time("count");
  if (count < 0) {
    count = await vehicle.countDocuments(query);
  }
  // console.timeEnd("count");
  return { items: allValues, skip: limit + skip, count };
}

// find(0, 200, {}).then(data => { console.log(data) })

module.exports = {
  find,
};
