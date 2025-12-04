document.addEventListener('DOMContentLoaded', () => {
    buscarTiposPokemon();
});

async function buscarTiposPokemon() {
    const input = document.getElementById("pokemonNameInput");
    const card = document.getElementById("results-card");
    const nombreOId = input.value.toLowerCase().trim();

    if (!nombreOId) {
        card.innerHTML = "<h3>Por favor, ingresa un nombre o ID de Pokémon.</h3>";
        return;
    }

    try {
        const URL = `https://pokeapi.co/api/v2/pokemon/${nombreOId}`;
        const res = await fetch(URL);

        if (!res.ok) {
            throw new Error(`Pokémon "${nombreOId}" no encontrado (Código: ${res.status})`);
        }

        const data = await res.json();
        
        const tipos = data.types.map(t => t.type.name); 
        const tiposStr = tipos.join(", "); 

        card.innerHTML = `
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <h2>${data.name.toUpperCase()}</h2>
            <p><strong>Tipos:</strong> ${tiposStr}</p>
        `;

        console.log(`Tipos de ${data.name}: ${tiposStr}`);
        
    } catch (error) {
        console.error("Error:", error.message);
        card.innerHTML = `<h3>Error al obtener datos: ${error.message}</h3>`;
    }
}