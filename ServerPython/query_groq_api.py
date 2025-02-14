from flask import Flask, request, jsonify
from flask_cors import CORS  
import os

import requests


from sklearn.metrics.pairwise import cosine_similarity
from src.db.db_operations import get_movies_from_db
from src.utility.embedding_utils import genre_mapping

app = Flask(__name__)
CORS(app)


def query_groq_api(query):
    api_url = "https://api.groq.com/openai/v1/chat/completions"
    api_key = os.getenv("GROQ_API_KEY")

    messages = [
    {"role": "system", "content": """
    You are a movie assistant. Respond **only** to the user's exact request without adding extra details.
    
    - **Do not suggest movies** unless the user **explicitly asks** for recommendations.
    - **Acknowledge the user's feelings** if they express frustration, indecision, or dissatisfaction, such as when they say "I'm not sure," "I don't like any of that," or "bye."
    - If the user sends a **generic message** like "thank you," "bye," or any other unrelated message, **acknowledge it politely** but do **not provide movie details or suggestions.**
    - If the user expresses **indecision** (e.g., "let me think," "I'm undecided," "I don't know," "thinking about it"), **do not provide any suggestions** and allow them time to decide.
    - **If the user initiates casual conversation** (e.g., greetings like "Hi", "Hello", "Oi", "Olá"), **acknowledge it politely** but do not suggest movies unless explicitly asked.
    - **Keep responses short, direct, and strictly relevant** to the user's question.
    
    """},

    {"role": "user", "content": query}
]


    data = {
        "model": "llama3-70b-8192",
        "messages": messages,
        "max_completion_tokens": 100,
        "frequency_penalty": 0.5
    }

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    response = requests.post(api_url, json=data, headers=headers)

    if response.status_code == 200:
        response_data = response.json()
        return response_data["choices"][0]["message"]["content"]
    else:
        return f"Error: {response.status_code}, {response.text}"

@app.route("/movieChatBot", methods=["POST"])
def suggest_movie():
    data = request.json
    user_query = data.get("query")

    if not user_query:
        return jsonify({"error": "No query provided"}), 400

    final_query = f"""
    Based on the available movies in the database, suggest movies related to: {user_query}.
    """

    suggestion = query_groq_api(final_query)
    return jsonify({"suggestion": suggestion})

# ==========================

# starting server

# ==========================


if __name__ == "__main__":
    app.run(debug=False)