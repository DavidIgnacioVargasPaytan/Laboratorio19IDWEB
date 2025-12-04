document.addEventListener('DOMContentLoaded', () => {
    buscarStatsPokemon();
});

async function buscarStatsPokemon() {
    const input = document.getElementById("statsInput");
    const card = document.getElementById("stats-card");
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
        
        let statsTableRows = '<tr><th>Estadística</th><th>Valor Base</th></tr>';

        data.stats.forEach(statEntry => {
            const statName = statEntry.stat.name;
            const baseStat = statEntry.base_stat;

            statsTableRows += `
                <tr>
                    <td>${statName}</td>
                    <td>${baseStat}</td>
                </tr>
            `;
        });
        
        card.innerHTML = `
            <h2>${data.name.toUpperCase()}</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}" style="width:100px;">
            <table>
                ${statsTableRows}
            </table>
        `;
        
    } catch (error) {
        console.error("Error:", error.message);
        card.innerHTML = `<h3>Error al obtener datos: ${error.message}</h3>`;
    }
}