import { getClient } from './mongoClient.mjs';
import readline from 'readline';
import schema from '../../_schema/index.mjs';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function dbInit(wipe) {
  try {
    const client = await getClient();
    const db = client.db();

    if (wipe === 'y') {
      // Drop existing collections
      const collectionNames = await db.listCollections().toArray();
      collectionNames.forEach((collection) =>
        db.dropCollection(collection.name)
      );
      console.log('Deleted existing collections');
    }
    console.log('\n');

    // Create collections if they don't already exist
    for (const [collection_name, collection_schema] of Object.entries(schema)) {
      await db.createCollection(collection_name, {
        validator: {
          $jsonSchema: collection_schema,
        },
      });
      console.log(`Created collection: ${collection_name}...`);
    }
    console.log('Created collections');

    await client.close();
  } catch (error) {
    console.log(error);
  }
}

// decide if we want to wipe the database
let wipe = '';
rl.question('Would you like to reset your database? (y/n): ', function (str) {
  const lowerStr = str.toLowerCase();
  if (lowerStr === 'y' || lowerStr === 'n') {
    wipe = lowerStr;
  }
  dbInit(wipe);
  rl.close();
});
