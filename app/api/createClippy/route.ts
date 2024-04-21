import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";


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

  const uri = process.env.MONGO_URI as string;
  const dbname = process.env.MONGO_DB_NAME as string;
  const dbcollection = process.env.MONGO_COLLECTION_NAME as string;
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

    await client.close();

    return NextResponse.json({ id: id });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
