let offset = 0;
let limit = 10;
const maxRecords = 151;
const baseUrl = "https://pokeapi.co/api/v2/pokemon";
const url = `${baseUrl}?offset=${offset}&limit=${limit}`;

const convertPokemonPokeApiDetailToPokemon = (pokeDetail) => {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
  pokemon.types = pokeDetail.types.map((pokemonType) => pokemonType.type.name);

  return pokemon;
};

const loadPokemonDetails = async (pokemonName) => {
  const request = await fetch(`${baseUrl}/${pokemonName}`);
  const pokemonDetails = await request.json();
  const pokemon = convertPokemonPokeApiDetailToPokemon(pokemonDetails);

  return pokemon;
};

const loadPokemons = async () => {
  try {
    const requestPokemons = await fetch(url);
    const response = await requestPokemons.json();

    return response.results;
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Requisição finalizada!");
  }
};

const loadMorePokemonItens = async () => {
  offset += limit;
  let newUrl = "";

  const qtdRecordNextPage = offset + limit;

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    newUrl = `${baseUrl}?offset=${offset}&limit=${newLimit}`;
    loadMoreButton.classList.add("remove_button_load_more");
  } else {
    newUrl = `${baseUrl}?offset=${offset}&limit=${limit}`;
  }

  try {
    const requestPokemons = await fetch(newUrl);
    const response = await requestPokemons.json();

    return response.results;
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Mais pokemons adicionados!");
  }
};
