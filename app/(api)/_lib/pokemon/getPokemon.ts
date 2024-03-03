import { cache } from 'react';

import { NextResponse } from 'next/server';
import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { HttpError, NotFoundError } from '@utils/response/Errors';
import { ObjectId } from 'mongodb';

export const getPokemon = cache(async (id: string) => {
  try {
    const object_id = new ObjectId(id);
    const db = await getDatabase();
    const pokemon = await db.collection('pokemon').findOne({
      _id: object_id,
    });

    if (pokemon === null) {
      throw new NotFoundError(`Pokemon with id: ${id} not found.`);
    }

    return NextResponse.json({ ok: true, body: pokemon }, { status: 200 });
  } catch (e) {
    const error = e as HttpError;
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: error.status || 400 }
    );
  }
});

export const getManyPokemon = cache(async (query: object = {}) => {
  try {
    const db = await getDatabase();
    const pokemon = await db.collection('pokemon').find(query).toArray();

    return NextResponse.json({ ok: true, body: pokemon }, { status: 200 });
  } catch (e) {
    const error = e as HttpError;
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: error.status || 400 }
    );
  }
});
