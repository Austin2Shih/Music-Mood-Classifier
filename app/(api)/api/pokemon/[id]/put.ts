import { updatePokemon } from '@datalib/pokemon/updatePokemon';
import { NextRequest } from 'next/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  return updatePokemon(params.id, body);
}
