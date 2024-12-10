function generateAdjacencyMatrix() {
    const users = ["User 1", "User 2", "User 3", "User 4", "User 5", "User 6", "User 7"];
    const movies = [
        "The Princess Diaries", "13 Going on 30", "Love, Rosie", 
        "Avengers: Infinity War", "Deadpool 3", "X-Men: Dark Phoenix",
        "Toy Story", "Ratatouille", "The Incredibles", 
        "Legally Blonde", "White Chicks", "Mean Girls"
    ];
    
    const matrix = movies.map(movie => 
        users.map(user => {
            const checkbox = document.querySelector(`input[data-movie='${movie}'][data-user='${user}']`);
            return checkbox.checked ? 1 : 0;
        })
    );

    console.log(matrix); // Imprime la matriz en la consola para depurar.
    return { matrix, movies, users };
}

function cosineSimilarity(vecA, vecB) {
    const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val ** 2, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val ** 2, 0));

    return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
}

function generateRecommendations() {
    const { matrix, movies, users } = generateAdjacencyMatrix();
    const recommendations = {};

    // Comparar cada usuario con los demás
    users.forEach((user, i) => {
        const userVector = matrix.map(row => row[i]);
        const similarities = users.map((otherUser, j) => ({
            user: otherUser,
            similarity: i !== j ? cosineSimilarity(userVector, matrix.map(row => row[j])) : 0
        })).sort((a, b) => b.similarity - a.similarity);

        // Películas recomendadas basadas en el usuario más similar
        const mostSimilarUser = similarities[0]?.user;
        if (mostSimilarUser) {
            const j = users.indexOf(mostSimilarUser);
            const recommendationsForUser = movies.filter((movie, k) => matrix[k][j] === 1 && matrix[k][i] === 0);
            recommendations[user] = recommendationsForUser;
        }
    });

    console.log(recommendations); // Imprime las recomendaciones en la consola
    return recommendations;
}

function displayRecommendations() {
    const recommendations = generateRecommendations();
    const container = document.getElementById("recomendaciones-container");
    container.innerHTML = ""; // Limpia el contenido previo

    for (const [user, movies] of Object.entries(recommendations)) {
        const userRecommendations = document.createElement("div");
        userRecommendations.innerHTML = `<h3>${user}</h3><p>${movies.length ? movies.join(", ") : "Sin recomendaciones"}</p>`;
        container.appendChild(userRecommendations);
    }
}
