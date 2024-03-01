import styles from './PokemonList.module.scss';
import type Pokemon from '@datatypes/Pokemon';
import { getManyPokemon } from '@datalib/pokemon/getPokemon';

import PokemonCard from '../PokemonCard/PokemonCard';
export default async function PokemonList() {
  const res = await getManyPokemon();
  const pokemon = await res.json();
  if (!pokemon.ok) return 'Failed to retrieve Pokemon';
  return (
    <div className={styles.list_container}>
      {pokemon.body.map((pokemon: Pokemon, index: number) => (
        <PokemonCard key={index} pokemon={pokemon} />
      ))}
    </div>
  );
}
