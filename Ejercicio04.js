function obtenerAlturaPesoThen() {
  const URL = "https://pokeapi.co/api/v2/pokemon/pikachu";

  fetch(URL)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      console.log(`Usando .then para Pikachu:`);
      console.log("Altura (decimetros):", data.height);
      console.log("Peso (hectogramos):", data.weight);
    })
    .catch(err => console.error("Error al obtener datos de Pikachu (then):", err));
}
