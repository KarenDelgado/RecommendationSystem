// Inicializar el grafo vacío con posiciones personalizadas
const cy = cytoscape({
    container: document.getElementById('cy'),
    elements: [],
    style: [
        { selector: 'node', style: { 'background-color': '#bc3518', 'label': 'data(id)' } },
        { selector: 'edge', style: { 'width': 2, 'line-color': '#ccc' } },
    ],
    layout: {
        name: 'preset', // Usaremos coordenadas predefinidas
    },
});

// Coordenadas para nodos bipartitos
const userPositions = {
    'User 1': { x: 200, y: 50 },
    'User 2': { x: 400, y: 50 },
    'User 3': { x: 600, y: 50 },
    'User 4': { x: 800, y: 50 },
    'User 5': { x: 1000, y: 50 },
    'User 6': { x: 1200, y: 50 },
    'User 7': { x: 1400, y: 50 },
};

const moviePositions = {
    'The Princess Diaries': { x: 100, y: 250 },
    '13 Going on 30': { x: 250, y: 250 },
    'Love, Rosie': { x: 370, y: 250 },
    'Avengers: Infinity War': { x: 510, y: 250 },
    'Deadpool 3': { x: 650, y: 250 },
    'X-Men: Dark Phoenix': { x: 785, y: 250 },
    'Toy Story': { x: 910, y: 250 },
    'Ratatouille': { x: 1000, y: 250 },
    'The Incredibles': { x: 1110, y: 250 },
    'Legally Blonde': { x: 1240, y: 250 },
    'White Chicks': { x: 1360, y: 250 },
    'Mean Girls': { x: 1470, y: 250 },
};

// Función para agregar nodos con coordenadas predefinidas
function addNode(id, group) {
    const position = group === 'user' ? userPositions[id] : moviePositions[id];
    if (!cy.getElementById(id).length) {
        cy.add({
            data: { id },
            group: 'nodes',
            position,
        });
    }
}

// Función para agregar conexión
function addConnection(user, movie) {
    addNode(user, 'user'); // Asegurar que el usuario está añadido
    addNode(movie, 'movie'); // Asegurar que la película está añadida

    // Agregar conexión entre usuario y película
    if (!cy.getElementById(`${user}-${movie}`).length) {
        cy.add({ data: { id: `${user}-${movie}`, source: user, target: movie } });
    }
}

// Función para eliminar conexión
function removeConnection(user, movie) {
    // Verificar y eliminar la relación (borde) entre el usuario y la película
    const edgeId = `${user}-${movie}`;
    const edge = cy.getElementById(edgeId);
    if (edge.length > 0) {
        cy.remove(edge);
    }

    // Opcional: Eliminar nodos huérfanos (que no tienen conexiones)
    const userEdges = cy.edges(`[source="${user}"], [target="${user}"]`);
    const movieEdges = cy.edges(`[source="${movie}"], [target="${movie}"]`);

    if (userEdges.length === 0) {
        cy.remove(`#${user}`);
    }
    if (movieEdges.length === 0) {
        cy.remove(`#${movie}`);
    }
}

// Escuchar cambios en los checkboxes
document.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
        const user = e.target.getAttribute("data-user");
        const movie = e.target.getAttribute("data-movie");

        if (e.target.checked) {
            addConnection(user, movie); // Agregar al grafo
        } else {
            removeConnection(user, movie); // Eliminar del grafo
        }
    });
});