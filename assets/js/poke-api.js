
const pokeApi = {}

function convertPokeApiDetailPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type1] = types;

    pokemon.types = types;
    pokemon.type = type1;
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then((convertPokeApiDetailPokemon))
}

pokeApi.getPokemons = (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json()) // Recebe uma função com um argumento que é uma resposta
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails)
}
