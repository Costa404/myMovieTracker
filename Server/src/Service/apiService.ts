// export const fetchDataFromApi = async () => {
//   try {
//     const response = await fetch(
//       "http://localhost:3000/movies", // Alterado para a URL do seu servidor
//       {
//         method: "POST", // Definindo que o método é POST
//         headers: {
//           "Content-Type": "application/json", // Tipo de conteúdo sendo enviado
//         },
//         body: JSON.stringify({
//           // Corpo da requisição (dados para enviar)
//           api_key: "d351f155e840f50339b0982ce6baccc7", // API Key como exemplo
//           with_genres: 53, // Filtro de gênero como exemplo
//         }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`Erro na API: ${response.statusText}`);
//     }

//     const data = await response.json();

//     // Verifica se o JSON tem a estrutura esperada
//     if (!data || !data.results || !Array.isArray(data.results)) {
//       throw new Error("Formato inesperado da resposta da API.");
//     }

//     return data.results; // Retorna apenas a array de resultados
//   } catch (error) {
//     console.error("Erro ao buscar dados da API:", error);
//     throw error;
//   }
// };
export const fetchDataFromApi = async () => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=d351f155e840f50339b0982ce6baccc7"
    );

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || !data.results || !Array.isArray(data.results)) {
      throw new Error("Formato inesperado da resposta da API.");
    }

    return data.results;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    throw error;
  }
};
