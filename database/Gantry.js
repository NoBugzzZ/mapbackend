const { MongoClient } = require("mongodb");
const DB_URL = require("./config");

const uri =DB_URL
const client = new MongoClient(uri);

async function find(skip = 0) {
    if(!client.isConnected()) await client.connect();
    const database = client.db('digitaltwin');
    const gantry = database.collection('Gantry');
    // define an empty query document
    const query = {};
    const limit = 200;
    const cursor = gantry.find(query).limit(limit).skip(skip);
    // await cursor.forEach(console.dir);
    const allValues = await cursor.toArray();
    // console.log({items:allValues,cursor:limit+skip})
    return { items: allValues, cursor: limit + skip }
}

module.exports = {
  find
}