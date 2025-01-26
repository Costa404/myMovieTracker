import fetch from "node-fetch";
export const fetchDataFromApi = async () => {
    try {
        const response = await fetch("https://api.themoviedb.org/3/trending/all/day?api_key=d351f155e840f50339b0982ce6baccc7");
        console.log("response", response);
        if (Array.isArray(response)) {
            return response;
        }
        else {
            throw new Error("Invalid Data or data not found in Api.");
        }
    }
    catch (error) {
        console.error("Erro ao buscar dados da API:", error);
        throw error;
    }
};
