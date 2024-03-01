'use server';

import { revalidatePath } from 'next/cache';
import FormToJSON from '@utils/form/FormToJSON';
import { createPokemon } from '@datalib/pokemon/createPokemon';

export async function CreatePokemon(formData: FormData) {
  const dataJSON = FormToJSON(formData);
  await createPokemon(dataJSON);
  revalidatePath('/pokemon');
}
