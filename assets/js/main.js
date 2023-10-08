const pokemonsList = document.querySelector("#pokemons");
const loadMoreButton = document.querySelector("#loadMoreButton");

const createPokemonInHtml = async (pokemon) => {
  const pokemonData = await loadPokemonDetails(pokemon.name);

  const pokemonItem = document.createElement("li");
  const pokemonName = document.createElement("span");
  const pokemonNumber = document.createElement("span");
  const pokemonDetail = document.createElement("div");
  const pokemonTypes = document.createElement("ol");

  const pokemonImage = document.createElement("img");

  pokemonItem.classList.add("pokemon");
  pokemonItem.classList.add(pokemonData.types[0]);
  pokemonNumber.classList.add("number");
  pokemonName.classList.add("name");
  pokemonDetail.classList.add("detail");
  pokemonTypes.classList.add("types");

  pokemonImage.src = pokemonData.photo;
  pokemonImage.alt = pokemonData.name;

  for (let i = 0; i < pokemonData.types.length; i++) {
    const pokemonType = document.createElement("li");
    pokemonType.classList.add("type");
    pokemonType.classList.add(pokemonData.types[i]);
    pokemonType.textContent = pokemonData.types[i];
    pokemonTypes.append(pokemonType);
  }

  pokemonDetail.append(pokemonTypes);
  pokemonDetail.append(pokemonImage);
  pokemonNumber.textContent = "#" + `${pokemonData.number}`.padStart(3, "0");
  pokemonName.textContent = pokemon.name;

  pokemonItem.append(pokemonNumber);
  pokemonItem.append(pokemonName);
  pokemonItem.append(pokemonDetail);

  return pokemonItem;
};

const handleFetchPokemons = async () => {
  const pokemons = await loadPokemons();

  pokemons.map(async (pokemon) =>
    pokemonsList.append(await createPokemonInHtml(pokemon))
  );
};

const addMorePokemonsInHtml = async () => {
  const morePokemons = await loadMorePokemonItens();

  morePokemons.map(async (pokemon) =>
    pokemonsList.append(await createPokemonInHtml(pokemon))
  );
};

loadMoreButton.addEventListener("click", addMorePokemonsInHtml);

handleFetchPokemons();
