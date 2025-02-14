
from main import recommend_movies  

from flask import Flask, request, jsonify
from flask_cors import CORS  
from src.db.db_operations import get_movies_from_db
from input_movie_suggestion import find_similar_movies
from src.utility.embedding_utils import get_movie_embeddings

app = Flask(__name__)
CORS(app)

movies = get_movies_from_db()
movies_list = movies.to_dict('records')  # Convert DataFrame to list of dictionaries
movie_embeddings, movies = get_movie_embeddings(movies_list)

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

@app.route('/InputRecommendMovies', methods=['POST'])
def recommend_by_input():
    """Recomenda filmes baseados numa descrição"""
    try:
        data = request.get_json()  
        user_input = data.get('query')
        print(f"Recebido input: {user_input}")  

        if not user_input:
            return jsonify({'error': 'Nenhuma descrição foi fornecida'}), 400

        recommended_movies = find_similar_movies(user_input, movie_embeddings, movies)

        return jsonify({'recommended_movies': recommended_movies})

    except Exception as e:
        print(f"Erro: {e}")  
        return jsonify({'error': str(e)}), 500  


  

# ======================

# starting server

# ======================
if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000)  
