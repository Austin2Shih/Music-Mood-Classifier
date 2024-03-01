/**
 * Takes in a json object and renames one attribute.
 */
export function renameAttribute(jsonObj, oldFieldName, newFieldName) {
  if (jsonObj[oldFieldName]) {
    // Create a new object with the renamed attribute
    const renamedObject = {
      ...jsonObj,
      [newFieldName]: jsonObj[oldFieldName],
    };

    // Delete the old attribute
    delete renamedObject[oldFieldName];
    return renamedObject;
  }

  // Return the original object if the old attribute doesn't exist
  return jsonObj;
}

/**
 * subset of renaming attribute, appends a prefix of "prefix" before the attribute name
 * "prefix" comes from mongodb nested documents
 */
export function prependToAttribute(jsonObj, attribute, prefix) {
  return renameAttribute(jsonObj, attribute, `${prefix}${attribute}`);
}

/**
 * For each attribute within an updater such as:
 * {
 *  "$set": {"name": "austin", "age": 20}
 * }
 * (in this case, the fields in question are "name" and "age" and the updater is "$set")
 * Append the prefix of prefix to each attribute.
 *
 * This results in:
 * {
 *  "$set": {"PREFIXname": "austin", "PREFIXage": 20},
 * }
 * where prefix = PREFIX
 */
export function prependObjectAttributes(jsonObj, prefix) {
  for (const key of Object.keys(jsonObj)) {
    jsonObj = prependToAttribute(jsonObj, key, prefix);
  }
  return jsonObj;
}

/**
 * For each updater within a request body
 * {
 *  "$set": {"name": "austin", "age": 20},
 *  "$push": {"pokemon": ..., ...}
 * }
 * (in this case, the updaters in question are "$set" and "$push"
 * run prependObjectAttributes() on the content within
 *
 * This results in:
 * {
 *  "$set": {"PREFIXname": "austin", "PREFIXage": 20},
 *  "$push": {"PREFIXpokemon": ..., ...}
 * }
 * where prefix = PREFIX
 */
export function prependAllAttributes(jsonObj, prefix) {
  for (const [key, val] of Object.entries(jsonObj)) {
    jsonObj[key] = prependObjectAttributes(val, prefix);
  }
  return jsonObj;
}
