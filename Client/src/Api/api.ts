const API_URL = import.meta.env.VITE_API_URL;

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

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};
