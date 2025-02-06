from flask import Flask, request, jsonify
from main import recommend_movies  
from flask_cors import CORS  
app = Flask(__name__)

CORS(app) 

@app.route('/recommendMovies', methods=['POST'])
def recommend():
    try:
        data = request.get_json()  
        movie_id = data.get('movie_id') 
        print(f"Recebido movie_id: {movie_id}")  

        if movie_id is None:
            return jsonify({'error': 'movie_id não foi fornecido'}), 400

        # Chama a função recommend_movies do main.py para obter a recomendação
        recommended_movies = recommend_movies(movie_id)  

    
        return jsonify({'recommended_movies': recommended_movies})

    except Exception as e:
        print(f"Erro: {e}")  #
        return jsonify({'error': str(e)})

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000)  
