const TOTAL_POKEMON = 12;
const POKEMON_POR_GRUPO = 3;
let pokemonData = [];
let currentIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    cargarTodosLosPokemon();
});

async function obtenerPokemon(id) {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(URL);
    if (!res.ok) {
        throw new Error(`Error HTTP al obtener el ID ${id}: ${res.status}`);
    }
    return res.json();
}

async function cargarTodosLosPokemon() {
    const pokemonPromises = [];

    for (let id = 1; id <= TOTAL_POKEMON; id++) {
        pokemonPromises.push(obtenerPokemon(id));
    }

    try {
        pokemonData = await Promise.all(pokemonPromises);
        mostrarGrupoPokemon(currentIndex); 
    } catch (error) {
        console.error("Error al cargar la lista completa de Pokémon:", error);
        document.getElementById("pokemon-container").innerHTML = "<h3>Error al cargar los Pokémon.</h3>";
    }
}

function mostrarGrupoPokemon(startIndex) {
    const container = document.getElementById("pokemon-container");
    container.innerHTML = "";

    const grupoActual = pokemonData.slice(startIndex, startIndex + POKEMON_POR_GRUPO);

    grupoActual.forEach(data => {
        const card = document.createElement("div");
        card.className = "pokemon-card";

        card.innerHTML = `
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <h3>${data.name.toUpperCase()}</h3>
            <p>#${data.id}</p>
        `;
        container.appendChild(card);
    });
    
    actualizarControles();
}

function mostrarSiguiente() {
    if (currentIndex + POKEMON_POR_GRUPO < TOTAL_POKEMON) {
        currentIndex += POKEMON_POR_GRUPO;
        mostrarGrupoPokemon(currentIndex);
    }
}

function mostrarAnterior() {
    if (currentIndex > 0) {
        currentIndex -= POKEMON_POR_GRUPO;
        mostrarGrupoPokemon(currentIndex);
    }
}

function actualizarControles() {
    document.getElementById("btnAnterior").disabled = (currentIndex === 0);
    document.getElementById("btnSiguiente").disabled = (currentIndex + POKEMON_POR_GRUPO >= TOTAL_POKEMON);
}