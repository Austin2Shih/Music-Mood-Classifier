import styles from './CreatePokemonForm.module.scss';

import { CreatePokemon } from '@actions/pokemon/CreatePokemon';
export default function CreatePokemonForm() {
  return (
    <div className={styles.form_container}>
      <h3>Create Pokemon</h3>
      <form action={CreatePokemon}>
        <div>
          <label>name</label>
          <input name="name" type="text"></input>
        </div>
        <button type="submit">Create Pokemon</button>
      </form>
    </div>
  );
}
