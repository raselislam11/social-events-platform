import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is missing from environment variables");
}

let client: MongoClient | null = null;

export function getMongoClient(): MongoClient {
  if (!client) {
    if (!uri) {
      throw new Error("MONGODB_URI is missing from environment variables");
    }
    client = new MongoClient(uri);
  }
  return client;
}

export function getAuthDatabase(): Db {
  return getMongoClient().db();
}
