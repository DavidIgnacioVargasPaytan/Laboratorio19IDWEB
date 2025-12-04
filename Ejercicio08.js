async function obtenerPokemonAleatorio() {
  try {
    const ID_MAXIMO = 898;
    const randomId = Math.floor(Math.random() * ID_MAXIMO) + 1;
    const URL = `https://pokeapi.co/api/v2/pokemon/${randomId}`;
    
    const res = await fetch(URL);

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const data = await res.json();
    
    const habilidades = data.abilities.map(a => a.ability.name).join(", ");

    console.log("Pokémon Aleatorio");
    console.log(`ID: ${data.id}`);
    console.log(`Nombre: ${data.name.toUpperCase()}`);
    console.log(`Altura (decimetros): ${data.height}`);
    console.log(`Peso (hectogramos): ${data.weight}`);
    console.log(`Habilidades: ${habilidades}`);
    console.log(`Sprite URL: ${data.sprites.front_default}`);

  } catch (error) {
    console.error("Error al obtener Pokémon aleatorio:", error.message);
  }
}
