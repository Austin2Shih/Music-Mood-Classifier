import { NextRequest, NextResponse } from 'next/server';

import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import getQueries from '@utils/request/getQueries';
import { HttpError } from '@utils/response/Errors';

export async function GET(request: NextRequest) {
  try {
    const queries = getQueries(request);
    const db = await getDatabase();

    const trainers = await db.collection('trainers').find(queries).toArray();

    return NextResponse.json({ ok: true, body: trainers }, { status: 200 });
  } catch (e) {
    const error = e as HttpError;
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: error.status || 400 }
    );
  }
}
