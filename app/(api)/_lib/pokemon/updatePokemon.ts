import { NextResponse } from 'next/server';

import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { ObjectId } from 'mongodb';

import { prependAllAttributes } from '@utils/request/prependAttributes';
import isBodyEmpty from '@utils/request/isBodyEmpty';
import parseAndReplace from '@utils/request/parseAndReplace';
import {
  HttpError,
  NoContentError,
  NotFoundError,
} from '@utils/response/Errors';

export const updatePokemon = async (id: string, body: object) => {
  try {
    const object_id = new ObjectId(id);
    if (isBodyEmpty(body)) {
      throw new NoContentError();
    }
    const parsedBody = await parseAndReplace(body);

    const db = await getDatabase();
    const pokemon = await db.collection('pokemon').updateOne(
      {
        _id: object_id,
      },
      parsedBody
    );

    const subDocumentUpdate = prependAllAttributes(body, 'pokemon.$[pokemon].');
    const trainer_pokemon = await db
      .collection('trainers')
      .updateMany({}, subDocumentUpdate, {
        arrayFilters: [{ 'pokemon._id': object_id }],
      });

    if (pokemon.matchedCount === 0) {
      throw new NotFoundError(`Pokemon with id: ${id} not found.`);
    }

    return NextResponse.json(
      { ok: true, body: [pokemon, trainer_pokemon] },
      { status: 200 }
    );
  } catch (e) {
    const error = e as HttpError;
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: error.status || 400 }
    );
  }
};
