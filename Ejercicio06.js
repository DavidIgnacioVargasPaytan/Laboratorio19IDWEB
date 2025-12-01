async function obtenerSpriteCharizard() {
  try {
    const URL = "https://pokeapi.co/api/v2/pokemon/charizard";
    const res = await fetch(URL);

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const data = await res.json();
    const spriteURL = data.sprites.front_default;

    console.log("URL del sprite frontal de Charizard:", spriteURL);
  } catch (error) {
    console.error("Error al obtener el sprite de Charizard:", error.message);
  }
}
