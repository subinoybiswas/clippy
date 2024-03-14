import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(req: Request) {
  const request = await req.json();
  console.log(request);

  // Connect to MongoDB
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  await client.connect();

  // Access the database and collection
  const db = client.db("yourDatabaseName");
  const collection = db.collection("yourCollectionName");

  // Create the entry
  const entry = {
    /* Your entry data here */
  };
  await collection.insertOne(entry);

  // Close the connection
  await client.close();

  return NextResponse.json({ id: "1234" });
}
