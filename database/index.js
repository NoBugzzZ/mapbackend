// const { MongoClient } = require("mongodb");
// const uri =
//   "mongodb://root:123456@localhost:27017?retryWrites=true&writeConcern=majority";
// const client = new MongoClient(uri);
// async function run() {
//   try {
//     await client.connect();
//     const database = client.db('oauth');
//     const users = database.collection('users');
//     const query={username:'张三'}
//     const user=await users.findOne(query)
//     console.log(user)
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);

const { MongoClient } = require("mongodb");
const uri =
  "mongodb://localhost:27017/";
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    const database = client.db('digitaltwin');
    const gantry = database.collection('Gantry');
    // define an empty query document
    const query = {};
    const limit = 3;
    const skip = 2;
    const cursor = gantry.find(query).limit(limit).skip(skip);
    // await cursor.forEach(console.dir);
    const allValues = await cursor.toArray();
    console.log({items:allValues,cursor:limit+skip})
  } finally {
    await client.close();
  }
}
run().catch(console.dir);