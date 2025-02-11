const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URL);

async function main() {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db("HelloWorld");
    const collection = db.collection("User");

    const data = {
        firstname: "Sharadindu",
        lastname: "Das",
        city: "Kolkata",
        phoneNumber: "987654321"
    };

    const insertResult = await collection.insertOne(data);
    console.log("Inserted documents =>", insertResult);

    // Read
    const findResult = await collection.find({}).toArray();
    console.log("Found documents =>", findResult);

    const countResult = await collection.countDocuments({});
    console.log("Count of documents in the User collection =>", countResult);

    const result = await collection.find({ lastname: "Das" }).countDocuments();
    console.log("result => ", result);

    return "done.";
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
