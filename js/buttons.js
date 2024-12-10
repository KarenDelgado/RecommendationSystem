document.getElementById('zoom-in').addEventListener('click', () => {
    cy.zoom(cy.zoom() * 1.2); // Aumenta el zoom
    cy.center(); // Centra el grafo
});

document.getElementById('zoom-out').addEventListener('click', () => {
    cy.zoom(cy.zoom() * 0.8); // Reduce el zoom
    cy.center();
});

document.getElementById('center-graph').addEventListener('click', () => {
    cy.center(); // Centra el grafo al presionar el botón
    cy.zoom(1);  // Opcional: Ajusta el nivel de zoom
});
