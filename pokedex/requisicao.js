const pokeApi = {};

import { Pokemon } from "./modelo_pokemon.js";

function conversorDePokemonDeDetalhe (pokemonDetalhe) {
    const pokemon = new Pokemon ();
    pokemon.number = pokemonDetalhe.order;
    pokemon.name = pokemonDetalhe.name;
    pokemon.types = pokemonDetalhe.types.map((typeSlot) => typeSlot.type.name)
    pokemon.type = pokemon.types.get(0);
    pokemon.photo = pokemonDetalhe.sprites.front_default;

    return pokemon;
}

pokeApi.pegarPokemonDetalhe = (pokemon) => {
    return fetch(url)
        .then((response) => response.json())
        .then(conversorDePokemonDeDetalhe)
}

pokeApi.getPokemons = (limit = 10, offset = 0) => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map((pokemon) => fetch(pokemon.url).then(response => response.json())))
        .then((detalheDaRequisicao) => Promise.all(detalheDaRequisicao))
        .then(detalheDoPokemon => detalheDoPokemon)
        .catch((error) => console.log(error))
}
export { pokeApi };
