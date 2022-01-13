const { MongoClient } = require("mongodb");
const DB_URL = require("./config");

const uri = DB_URL
const client = new MongoClient(uri);

async function find() {
  if (!client.isConnected()) await client.connect();
  const database = client.db('ExcelInfo');
  const gantryinfo = database.collection('NewGantryInfo');
  const cursor = gantryinfo.find({});
  const allValues = await cursor.toArray();
  return allValues
}

// find().then(data => { console.log(data) })

module.exports = {
  find,
}