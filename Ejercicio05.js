async function obtenerAlturaPesoAsync() {
  try {
    const URL = "https://pokeapi.co/api/v2/pokemon/pikachu";
    
    const res = await fetch(URL);

    if (!res.ok) { 
      throw new Error(`Error en la solicitud: ${res.status}`);
    }

    const data = await res.json();

    console.log(`Usando async/await para Pikachu:`);
    console.log("Altura (decimetros):", data.height);
    console.log("Peso (hectogramos):", data.weight);
  } catch (err) {
    console.error("Error al obtener datos de Pikachu (async/await):", err);
  }
}
