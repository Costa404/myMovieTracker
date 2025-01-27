// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// interface FetchOptions extends RequestInit {
//   headers?: Record<string, string>;
// }

// export const apiFetch = async (
//   endpoint: string,
//   options: FetchOptions = {}
// ) => {
//   const token = localStorage.getItem("authToken");

//   // Defina os headers com Record<string, string>
//   const headers: Record<string, string> = {
//     "Content-Type": "application/json",
//     ...(options.headers || {}),
//   };

//   if (token) {
//     headers.Authorization = `Bearer ${token}`;
//   }

//   const response = await fetch(`${API_URL}/${endpoint}`, {
//     ...options,
//     headers, // Passa os headers para a requisição
//   });

//   if (!response.ok) {
//     throw new Error(`Error: ${response.statusText}`);
//   }

//   return response.json();
// };
const API_URL = import.meta.env.VITE_API_URL;
console.log("API:URL", API_URL);

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
  isPublicRoute?: boolean;
}
export const apiFetch = async (
  endpoint: string,
  options: FetchOptions = { isPublicRoute: false }
) => {
  const token = localStorage.getItem("authToken");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (!options.isPublicRoute && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const contentType = response.headers.get("Content-Type");

    if (contentType && contentType.includes("application/json")) {
      return response.json();
    } else {
      throw new Error("Expected JSON, but got a different content type.");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};
