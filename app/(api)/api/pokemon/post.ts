import { NextRequest } from 'next/server';
import { createPokemon } from '@datalib/pokemon/createPokemon';

export async function POST(request: NextRequest) {
  const body = await request.json();
  return createPokemon(body);
}
