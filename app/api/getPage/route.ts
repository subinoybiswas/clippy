import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import dotenv from 'dotenv';

dotenv.config();

export async function POST(req: Request) {
  try {
    const request = await req.json();
    console.log("Got Request for", request);

    const uri = process.env.MONGODB_URI;
    const dbname = process.env.MONGO_DB_NAME;
    const dbcollection = process.env.MONGO_COLLECTION_NAME;

    if (!uri || !dbname || !dbcollection) {
      console.error("MongoDB environment variables are not defined");
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }

    console.log('MONGODB_URI:', uri);
    console.log('MONGO_DB_NAME:', dbname);
    console.log('MONGO_COLLECTION_NAME:', dbcollection);

    const client = new MongoClient(uri);

    await client.connect();
    const database = client.db(dbname);
    const collection = database.collection(dbcollection);

    const result = await collection.findOne({ id: request.clippyId });
    await client.close();

    if (result) {
      console.log("Result", result);
      return NextResponse.json({ content: result });
    } else {
      console.log("No data found");
      return NextResponse.json({ content: null }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching Clippy:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
