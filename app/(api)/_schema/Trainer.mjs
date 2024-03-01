import Pokemon from './Pokemon.mjs';

const Trainer = {
  bsonType: 'object',
  title: 'Trainer Object Validation',
  properties: {
    _id: {
      bsonType: 'objectId',
      description: '_id must be an ObjectId',
    },
    name: {
      bsonType: 'string',
      description: 'name must be a string',
    },
    pokemon: {
      bsonType: 'array',
      items: Pokemon,
      description: 'pokemon must be a list of Pokemon type',
    },
  },
  additionalProperties: false,
};

export default Trainer;
