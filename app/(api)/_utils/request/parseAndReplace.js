import { ObjectId } from 'mongodb';

import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
/**
 * Takes object resembling example below with an "*expandIds" field:
 * {
 *   "*expandIds": {
 *       "ids": ["658f94018dac260ae7b17fce", "658f940e8dac260ae7b17fd0"],
 *       "from": "pokemon"
 *     }
 * }
 * When an object that resembles the above object is encountered, return an array of documents
 * from the "from" collection
 */
async function expandIds(obj) {
  obj = obj['*expandIds'];
  const db = await getDatabase();
  const documents = await db
    .collection(obj.from)
    .find({
      _id: { $in: obj.ids.map((id) => new ObjectId(id)) },
    })
    .toArray();
  return documents;
}

/**
 * Takes object resembling example below with an "*expandId" field:
 * {
 *   "*expandId": {
 *       "id": "658f94018dac260ae7b17fce",
 *       "from": "pokemon"
 *     }
 * }
 * When an object that resembles the above object is encountered, return a document
 * from the "from" collection
 */
async function expandId(obj) {
  obj = obj['*expandId'];
  const db = await getDatabase();
  const documents = await db.collection(obj.from).findOne({
    _id: new ObjectId(obj.id),
  });
  return documents;
}

/**
 * Takes object resembling example below with a "*convertIds" field:
 * {
 *   "*convertIds": {
 *       "ids": ["658f94018dac260ae7b17fce", "658f940e8dac260ae7b17fd0"],
 *     }
 * }
 *
 * Returns the array of ids converted to ObjectIds
 */
async function convertIds(obj) {
  obj = obj['*convertIds'];
  return obj.ids.map((id) => new ObjectId(id));
}

/**
 * Takes object resembling example below with a "*convertId" field:
 * {
 *   "*convertId": {
 *       "id": "658f94018dac260ae7b17fce",
 *     }
 * }
 *
 * Returns the id converted to an ObjectId
 */
async function convertId(obj) {
  obj = obj['*convertId'];
  return new ObjectId(obj.id);
}

/**
 * Searches through a json object and replaces all objects that have a key of
 * "*keyword" with the object processed with replaceFunc()
 *
 * replacements comes in the form of:
 * {
 *    "*keyword": replaceFunc,
 *    "*keyword2": replaceFunc2
 * }
 */
async function searchAndReplace(obj, replacements) {
  if (typeof obj !== 'object') {
    return obj;
  }
  for (const [key, val] of Object.entries(obj)) {
    let replaced = false;
    for (const [keyword, replaceFunc] of Object.entries(replacements)) {
      if (val[keyword] !== undefined) {
        obj[key] = await replaceFunc(val);
        replaced = true;
        break;
      }
    }
    if (!replaced) {
      obj[key] = await searchAndReplace(val, replacements);
    }
  }
  return obj;
}

export default async function parseAndReplace(obj) {
  const res = await searchAndReplace(obj, {
    '*expandId': expandId,
    '*expandIds': expandIds,
    '*convertId': convertId,
    '*convertIds': convertIds,
  });
  return res;
}
