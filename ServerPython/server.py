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
        print(f"Erro: {e}")  
        return jsonify({'error': str(e)})
    

# ======================

# starting server

# ======================


from  sentiment_analysis import analyze_movie_sentiment

@app.route("/fakeImbd", methods=['POST'])
def fakeImdb():
    try:
        data = request.get_json()  
        movie_id = data.get('movie_id') 
        print(f"Recebido movie_id: {movie_id}")  

        if movie_id is None:
            return jsonify({'error': 'movie_id não foi fornecido'}), 400

        # Chama a função sentiment_analysis passando o movie_id
        fakeImbd = analyze_movie_sentiment(movie_id)

        # Retorna a resposta com o resultado da análise
        return jsonify({'fakeImbd': fakeImbd})

    except Exception as e:
        print(f"Erro: {e}")  
        return jsonify({'error': str(e)}), 500

    
# ======================

# starting server

# ======================
if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000)  
