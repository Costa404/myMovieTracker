# # import os
# # from dotenv import load_dotenv
# # import requests
# # from src.db.db_operations import get_movies_from_db  # Importe sua função de consulta

# # # Load environment variables from the .env file
# # load_dotenv()

# # def query_groq_api(query):
# #     api_url = "https://api.groq.com/openai/v1/chat/completions"  # API URL
# #     api_key = os.getenv("GROQ_API_KEY")  # Load the API key from the .env file

# #     # Define the conversation data, including the user query
# #     messages = [
# #         {"role": "system", "content": "You are an assistant that suggests movies."},
# #         {"role": "user", "content": query}
# #     ]
    
# #     # Set up the body of the request for the GROQ API
# #     data = {
# #         "model": "llama-3.1-8b-instant",  # Use a model that supports chat completions
# #         "messages": messages,
# #         "max_completion_tokens": 100,  # Response token limit
# #         "frequency_penalty": 0.5  # Penalty for repetitions
# #     }
    
# #     headers = {
# #         "Authorization": f"Bearer {api_key}",
# #         "Content-Type": "application/json"
# #     }
    
# #     # Send the request to the GROQ API
# #     response = requests.post(api_url, json=data, headers=headers)
    
# #     if response.status_code == 200:
# #         response_data = response.json()
# #         return response_data["choices"][0]["message"]["content"]
# #     else:
# #         print(f"Error communicating with the API: {response.status_code}, {response.text}")
# #         return None

# # def suggest_movie_from_db():
# #     # Obter os filmes disponíveis na database
# #     available_movies = get_movies_from_db()

# #     # Verifica se o DataFrame está vazio
# #     if available_movies.empty:
# #         print("No movies found in the database.")
# #         return None

# #     # Extrai os títulos dos filmes como uma lista
# #     movies_list = available_movies["title"].tolist()  # <-- Aqui usa .tolist()

# #     # Verifica se há filmes na lista
# #     if not movies_list:
# #         print("No movies found in the database.")
# #         return None

# #     # Cria um contexto com os títulos disponíveis
# #     movies_context = ", ".join(movies_list)

# #     # Formata a query corretamente
# #     query = f"""
# # The following movies are available in my database: {movies_context}.
# # Please only reference actors who are actually listed in these movies.
# # Which of these movies feature chistropher Nolan?
# # """




# #     # Chame a função que consulta a API do Groq, passando a query gerada
# #     suggestion = query_groq_api(query)
# #     return suggestion

# # if __name__ == "__main__":
# #     movie_suggestion = suggest_movie_from_db()
# #     if movie_suggestion:
# #         print("Movie Suggestion:", movie_suggestion)
# #     else:
# #         print("Failed to get a movie suggestion.")

# from flask import Flask, request, jsonify
# import os
# from dotenv import load_dotenv
# import requests

# from flask_cors import CORS  

# app = Flask(__name__)
# CORS(app)
# # Load environment variables
# load_dotenv()

# def query_groq_api(query):
#     api_url = "https://api.groq.com/openai/v1/chat/completions"
#     api_key = os.getenv("GROQ_API_KEY")

#     messages = [
#     {"role": "system", "content": """
#     You are a movie assistant. Your task is to respond directly to the user's query based on their request.
#     - If the user asks for a **synopsis**, **cast**, **release date" or other specific movie details, respond **only with the requested information**.
#     - If the user specifically asks for **movie suggestions**, then suggest up to 3 movies based on the query.
#     - If the user sends a **generic message** like 'thank you', 'let me think', or something unrelated to movies, simply acknowledge it politely and do not suggest any movies or provide further details.
#     - Keep all responses **brief**, **direct**, and **relevant** to the user's request. Avoid long explanations and do not include extra information unless explicitly asked for.
#     """},  
#     {"role": "user", "content": query}
# ]




#     data = {
#         "model": "llama3-70b-8192",
#         "messages": messages,
#         "max_completion_tokens": 100,
#         "frequency_penalty": 0.5
#     }

#     headers = {
#         "Authorization": f"Bearer {api_key}",
#         "Content-Type": "application/json"
#     }

#     response = requests.post(api_url, json=data, headers=headers)

#     if response.status_code == 200:
#         response_data = response.json()
#         return response_data["choices"][0]["message"]["content"]
#     else:
#         return f"Error: {response.status_code}, {response.text}"
# @app.route("/movieChatBot", methods=["POST"])
# def suggest_movie():
#     data = request.json
#     user_query = data.get("query")

#     if not user_query:
#         return jsonify({"error": "No query provided"}), 400

  

#     # Define a query final para a API, que passa a lista de filmes relevantes como contexto
#     final_query = f"""
#     Based on the available movies in the database, suggest movies related to: {user_query}.
#     """

#     suggestion = query_groq_api(final_query)
#     return jsonify({"suggestion": suggestion})

# if __name__ == "__main__":
#     app.run(debug=True)
