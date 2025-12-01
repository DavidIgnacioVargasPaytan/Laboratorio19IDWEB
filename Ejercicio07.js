async function listarPrimeros20Pokemon() {
  try {
    const URL = "https://pokeapi.co/api/v2/pokemon?limit=20";
    const res = await fetch(URL);

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const data = await res.json();
    
    console.log("Primeros 20 Pokémon:");
    data.results.forEach((pokemon, index) => {
      console.log(`${index + 1}. ${pokemon.name}`);
    });

  } catch (error) {
    console.error("Error al listar los Pokémon:", error.message);
  }
}
