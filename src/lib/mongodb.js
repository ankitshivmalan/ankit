import { MongoClient } from 'mongodb';

const databaseName = process.env.MONGODB_DB || 'portfolio';

let clientPromise;

const getClientPromise = () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('Missing MONGODB_URI environment variable.');
  }

  if (clientPromise) {
    return clientPromise;
  }

  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = new MongoClient(uri).connect();
    }
    clientPromise = global._mongoClientPromise;
    return clientPromise;
  }

  clientPromise = new MongoClient(uri).connect();
  return clientPromise;
};

export const getDatabase = async () => {
  const connectedClient = await getClientPromise();
  return connectedClient.db(databaseName);
};
