'use server';

import { revalidatePath } from 'next/cache';
import FormToJSON from '@utils/form/FormToJSON';
import { updatePokemon } from '@datalib/pokemon/updatePokemon';

export async function UpdatePokemon(id: string, formData: FormData) {
  const dataJSON = FormToJSON(formData);
  await updatePokemon(id, {
    $set: dataJSON,
  });
  revalidatePath('/pokemon');
}
