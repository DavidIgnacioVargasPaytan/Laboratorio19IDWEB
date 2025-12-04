document.addEventListener('DOMContentLoaded', () => {
    buscarPokemon();
});

async function buscarPokemon() {
    const input = document.getElementById("pokemonInput");
    const card = document.getElementById("card");
    const nombreOId = input.value.toLowerCase().trim();

    if (!nombreOId) {
        card.innerHTML = "<h3>Por favor, ingresa un ID o nombre de Pokémon.</h3>";
        return;
    }

    try {
        const URL = `https://pokeapi.co/api/v2/pokemon/${nombreOId}`;
        const res = await fetch(URL);

        if (!res.ok) {
            throw new Error(`Pokémon "${nombreOId}" no encontrado (Código: ${res.status})`);
        }

        const data = await res.json();
        const habilidades = data.abilities.map(a => a.ability.name).join(", ");

        card.innerHTML = `
            <img src="${data.sprites.front_default}" alt="${data.name}"> <h2>${data.name.toUpperCase()}</h2> <p><strong>ID:</strong> ${data.id}</p> <p><strong>Peso (hg):</strong> ${data.weight}</p> <p><strong>Altura (dm):</strong> ${data.height}</p> <p><strong>Habilidades:</strong> ${habilidades}</p> `;
        
    } catch (error) {
        console.error("Error:", error.message);
        card.innerHTML = `<h3>Error al obtener datos: ${error.message}</h3>`;
    }
}