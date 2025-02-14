from flask import Flask, request, jsonify
from flask_cors import CORS  
import os
from dotenv import load_dotenv
import requests
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from src.db.db_operations import get_movies_from_db
from src.utility.embedding_utils import genre_mapping

app = Flask(__name__)
CORS(app)

# Load environment variables
load_dotenv()

movies = get_movies_from_db()

def genre_to_vector(genre_ids, all_genres):
    vector = np.zeros(len(all_genres))
    genre_names = []  
    for genre in genre_ids:
        if genre in genre_mapping:  
            genre_names.append(genre_mapping[genre])  
            vector[all_genres.index(genre)] = 1  
    return vector, genre_names  

movies['overview'] = movies['overview'].fillna('')

tfidf_vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf_vectorizer.fit_transform(movies['overview'])
cosine_sim_overview = cosine_similarity(tfidf_matrix, tfidf_matrix)

all_genres = list(genre_mapping.keys())
movies['genre_vector'], movies['genre_names'] = zip(*movies['genre_ids'].apply(lambda x: genre_to_vector(x, all_genres)))

def combine_features(idx):
    overview_sim = cosine_sim_overview[idx]
    genre_sim = movies['genre_vector'].iloc[idx]
    combined_features = np.concatenate([overview_sim, genre_sim])
    return combined_features

def recommend_movies(movie_id):
    idx_index = movies.index[movies['movie_id'] == movie_id]
    if idx_index.empty:
        return []
    idx = idx_index[0]
    
    sim_scores = []
    for i in range(len(movies)):
        sim_score = cosine_similarity([combine_features(idx)], [combine_features(i)])
        sim_scores.append((i, sim_score[0][0]))
    
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:9]
    
    movie_indices = [i[0] for i in sim_scores]
    
    recommended = []
    for i in movie_indices:
        recommended.append({
            "title": movies['title'].iloc[i],
            "poster_path": movies['poster_path'].iloc[i],
            "movie_id": int(movies['movie_id'].iloc[i])
        })
    
    return recommended


@app.route('/recommendMovies', methods=['POST'])
def recommend():
    try:
        data = request.get_json()  
        movie_id = data.get('movie_id') 
        print(f"Recebido movie_id: {movie_id}")  

        if movie_id is None:
            return jsonify({'error': 'movie_id não foi fornecido'}), 400

        recommended_movies = recommend_movies(movie_id)  

        return jsonify({'recommended_movies': recommended_movies})

    except Exception as e:
        print(f"Erro: {e}")  
        return jsonify({'error': str(e)})

# ==========================

# other function

# ==========================

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
