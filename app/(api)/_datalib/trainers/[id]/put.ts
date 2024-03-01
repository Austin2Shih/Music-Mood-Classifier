import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import parseAndReplace from '@utils/request/parseAndReplace';
import isBodyEmpty from '@utils/request/isBodyEmpty';
import {
  HttpError,
  NoContentError,
  NotFoundError,
} from '@utils/response/Errors';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = new ObjectId(params.id);
    const body = await request.json();
    if (isBodyEmpty(body)) {
      throw new NoContentError();
    }
    const preparedUpdater = await parseAndReplace(body);

    const db = await getDatabase();
    const trainer = await db.collection('trainers').updateOne(
      {
        _id: id,
      },
      preparedUpdater
    );

    if (trainer.matchedCount === 0) {
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
