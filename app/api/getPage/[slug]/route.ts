import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("your-database-name");
    const collection = database.collection("your-collection-name");
    const query = { slug };
    const result = await collection.findOne(query);
    if (result) {
      console.log(result);
      return NextResponse.json(result);
    } else {
      console.log("No data found");
    }
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}
