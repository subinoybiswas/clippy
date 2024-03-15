import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { text } from "stream/consumers";
import crypto from "crypto";

export async function POST(req: Request) {
  const request = await req.json();

  function generateRandomString(length: number) {
    // Generate random bytes
    const buffer = crypto.randomBytes(length);

    // Convert bytes to a hex string
    let hexString = buffer.toString("hex");

    // Add hyphens at appropriate positions
    let result = "";
    for (let i = 0; i < hexString.length; i++) {
      if (i > 0 && i % 4 === 0) {
        result += "-";
      }
      result += hexString[i];
    }

    return result;
  }

  // Connect to MongoDB
  const uri = process.env.MONGO_URI as string;
  const dbname = process.env.MONGO_DB_NAME as string;
  const dbcollection = process.env.MONGO_COLLECTION_NAME as string;
  const client = new MongoClient(uri);
  await client.connect();

  // Access the database and collection
  const db = client.db(dbname);
  const collection = db.collection(dbcollection);
  const id = generateRandomString(6);
  // Create the entry
  const entry = {
    id: id,
    text: request.text,
  };
  await collection.insertOne(entry);

  // Close the connection
  await client.close();

  return NextResponse.json({ id: id });
}
