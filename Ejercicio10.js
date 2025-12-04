async function obtenerPokemon(id) {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(URL);

    if (!res.ok) {
        throw new Error(`Error HTTP al obtener el ID ${id}: ${res.status}`);
    }
    return res.json();
}

async function cargarPrimeros10Pokemon() {
    const container = document.getElementById("pokemon-container");
    container.innerHTML = "<h3>Cargando Pokémon...</h3>";
    const pokemonPromises = [];

    for (let id = 1; id <= 10; id++) {
        pokemonPromises.push(obtenerPokemon(id));
    }

    try {
        const pokemones = await Promise.all(pokemonPromises);
        
        container.innerHTML = "";

        pokemones.forEach(data => {
            const card = document.createElement("div");
            card.className = "pokemon-card";

            card.innerHTML = `
                <img src="${data.sprites.front_default}" alt="${data.name}"> <h3>${data.name.toUpperCase()}</h3>
                <p>#${data.id}</p>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Error al cargar los Pokémon:", error);
        container.innerHTML = "<h3>Error al cargar la lista de Pokémon.</h3>";
    }
}

cargarPrimeros10Pokemon();