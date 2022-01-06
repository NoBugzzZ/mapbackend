const { MongoClient } = require("mongodb");
const DB_URL = require("./config");

const uri = DB_URL
const client = new MongoClient(uri);

async function find(skip = 0, limit = 200, query = {}) {
  if (!client.isConnected()) await client.connect();
  const database = client.db('DigitalModel');
  const vehicle = database.collection('VehicleDigital');
  const cursor = vehicle.find(query).limit(limit).skip(skip);
  const allValues = await cursor.toArray();
  const count = await vehicle.countDocuments(query);
  return { items: allValues, skip: limit + skip, count }
}

// find(0, 200, {}).then(data => { console.log(data) })

module.exports = {
  find,
}