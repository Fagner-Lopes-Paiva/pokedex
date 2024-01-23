const pokemonLista = document.querySelector('#listapokemon');
const butao = document.querySelector('#butaoPaginacao');
let limit = 10;
let offset = 0


function pegarPokemon(pokemon) {
    return `
    <div id="${pokemon.types[0].type.name}" class="cards">
        <img class="imgpokemon" src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <h2 id="nomepokemon">${pokemon.name}</h2>
    </div>
    `
}


import { pokeApi } from "./requisicao.js";

function carregarPokemons (limit, offset) {
    pokeApi.getPokemons(limit, offset).then((pokemons = []) => {
        pokemonLista.innerHTML += pokemons.map(pegarPokemon).join('');
    })
    
}

carregarPokemons(limit, offset);

butao.addEventListener('click', () => {
    carregarPokemons(limit += 10, offset += 1);
    
})
