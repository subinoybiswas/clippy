import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const request = await req.json();
  console.log("Got Request for", request);
  const uri = process.env.MONGO_URI as string;
  const dbname = process.env.MONGO_DB_NAME as string;
  const dbcollection = process.env.MONGO_COLLECTION_NAME as string;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db(dbname);
    const collection = database.collection(dbcollection);

    const result = await collection.findOne({ id: request.clippyId });
    if (result) {
      console.log("Result", result);
      return NextResponse.json({ content: result.text });
    } else {
      console.log("No data found");
      return NextResponse.json({ content: null }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}
