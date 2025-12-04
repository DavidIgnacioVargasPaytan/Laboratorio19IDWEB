async function obtenerNombrePorID() {
  const id = prompt("Ingresa el ID del Pokémon:");
  if (!id) {
    console.log("Operación cancelada o ID no ingresado.");
    return;
  }

  try {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(URL);

    if (!res.ok) {
      throw new Error(`Pokémon con ID ${id} no encontrado (Código: ${res.status})`);
    }

    const data = await res.json();
    console.log(`El Pokémon con ID ${id} es: ${data.name.toUpperCase()}`);
  } catch (error) {
    console.error("Error al obtener el Pokémon:", error.message);
  }
}