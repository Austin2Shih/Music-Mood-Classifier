import { NextRequest } from 'next/server';
import { getPokemon } from '@datalib/pokemon/getPokemon';

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  return getPokemon(params.id);
}
