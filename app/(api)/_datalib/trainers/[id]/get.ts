import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { HttpError, NotFoundError } from '@utils/response/Errors';

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = new ObjectId(params.id);
    const db = await getDatabase();

    const trainer = await db.collection('trainers').findOne({ _id: id });

    if (trainer === null) {
      throw new NotFoundError(`Trainer with id: ${params.id} not found.`);
    }

    return NextResponse.json({ ok: true, body: trainer }, { status: 200 });
  } catch (e) {
    const error = e as HttpError;
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: error.status || 400 }
    );
  }
}
