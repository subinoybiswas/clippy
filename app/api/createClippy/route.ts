import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

export async function POST(req: Request) {
  const request = await req.json();
  console.log("Got Request for", request);

  function generateRandomString() {
    const randomNumber =
      Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    const numberString = randomNumber.toString();

    const formattedString =
      numberString.slice(0, 3) + "-" + numberString.slice(3, 6);

    return formattedString;
  }

  const uri = process.env.MONGODB_URI;
  const dbname = process.env.MONGO_DB_NAME;
  const dbcollection = process.env.MONGO_COLLECTION_NAME;

  console.log('MONGODB_URI:', uri);
  console.log('MONGO_DB_NAME:', dbname);
  console.log('MONGO_COLLECTION_NAME:', dbcollection);

  if (!uri || !dbname || !dbcollection) {
    console.error("MongoDB environment variables are not defined");
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  const client = new MongoClient(uri);
  try {
    await client.connect();

    const db = client.db(dbname);
    const collection = db.collection(dbcollection);
    const id = generateRandomString();
    const entry = {
      id: id,
      text: request.text,
      url: request.url,
      expireAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };
    await collection.insertOne(entry);

    return NextResponse.json({ id: id });
  } catch (error) {
    console.error("Error creating Clippy:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
