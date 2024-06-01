import { MongoClient } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);
const databaseName = process.env.MONGO_DB_NAME as string;
const collectionName = process.env.MONGO_COLLECTION_NAME as string;

export async function POST(req: NextRequest) {
  const { clippyId } = await req.json();

  try {
    await client.connect();
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);

    const clippy = await collection.findOne({ _id: clippyId });

    if (clippy) {
      return NextResponse.json({ exists: true });
    } else {
      return NextResponse.json({ exists: false }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await client.close();
  }
}
