import styles from './PokemonCard.module.scss';
import { UpdatePokemon } from '@actions/pokemon/UpdatePokemon';
import type Pokemon from '@datatypes/Pokemon';

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const UpdatePokemonWithId = UpdatePokemon.bind(null, pokemon._id);
  return (
    <div className={styles.container}>
      <h3 className={styles.subtitle}>POKEMON NAME</h3>
      <p>{pokemon.name}</p>
      <hr />
      <form action={UpdatePokemonWithId}>
        <h3>Rename form</h3>
        <div>
          <label>New name</label>
          <input name="name" type="text"></input>
        </div>
        <button type="submit">{`Update ${pokemon.name}`}</button>
      </form>
    </div>
  );
}
