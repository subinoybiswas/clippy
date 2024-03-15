import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { text } from "stream/consumers";
import crypto from "crypto";

export async function POST(req: Request) {
  const request = await req.json();

  function generateRandomString() {
    // Generate random bytes
    const buffer = crypto.randomBytes(3);

    // Convert bytes to a hex string
    const hexString = buffer.toString("hex");

    return hexString;
  }

  // Connect to MongoDB
  const uri = process.env.MONGO_URI as string;
  const dbname = process.env.MONGO_DB_NAME as string;
  const dbcollection = process.env.MONGO_COLLECTION_NAME as string;
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db(dbname);
  const collection = db.collection(dbcollection);
  const id = generateRandomString();
  const entry = {
    id: id,
    text: request.text,
    expireAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  };
  await collection.insertOne(entry);

  await client.close();

  return NextResponse.json({ id: id });
}
