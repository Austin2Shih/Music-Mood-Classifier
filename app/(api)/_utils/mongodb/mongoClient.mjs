import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_CONNECTION_STRING;
let cachedClient = null;

export async function getClient() {
  if (cachedClient) {
    return cachedClient;
  }
  const client = new MongoClient(uri);
  cachedClient = client;
  return cachedClient;
}

export async function getDatabase() {
  const client = await getClient();
  return client.db();
}
