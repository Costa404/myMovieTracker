

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from src.db.db_operations import get_movies_from_db


movies = get_movies_from_db()


genre_mapping = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
}

# Função para criar uma representação vetorial do 'genre_ids'
def genre_to_vector(genre_ids, all_genres):
    vector = np.zeros(len(all_genres))
    genre_names = []  # Lista para armazenar os nomes dos gêneros
    for genre in genre_ids:
        if genre in genre_mapping:  # Verificar se o ID existe no mapeamento
            genre_names.append(genre_mapping[genre])  # Adiciona o nome do gênero
            vector[all_genres.index(genre)] = 1  # Marca o gênero no vetor
    return vector, genre_names  # Retorna tanto o vetor quanto os nomes dos gêneros

# Preenchendo valores ausentes na coluna overview
movies['overview'] = movies['overview'].fillna('')

# Vetorização do texto com TF-IDF (para o 'overview')
tfidf_vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf_vectorizer.fit_transform(movies['overview'])

# Calculando a similaridade cosseno para o 'overview'
cosine_sim_overview = cosine_similarity(tfidf_matrix, tfidf_matrix)

# Definir todos os gêneros possíveis
all_genres = list(genre_mapping.keys())

# Criar vetor de gêneros para cada filme
movies['genre_vector'], movies['genre_names'] = zip(*movies['genre_ids'].apply(lambda x: genre_to_vector(x, all_genres)))

# Função para combinar as características de 'overview' e 'gêneros'
def combine_features(idx):
    # Similaridade de overview
    overview_sim = cosine_sim_overview[idx]
    # Vetor de gêneros
    genre_sim = movies['genre_vector'].iloc[idx]
    # Concatenar ambos
    combined_features = np.concatenate([overview_sim, genre_sim])
    return combined_features

def recommend_movies(movie_id):
    # Encontrar o índice do filme baseado no ID
    idx_index = movies.index[movies['id'] == movie_id]
    if idx_index.empty:
        return []  # Caso o filme não exista
    idx = idx_index[0]
    
    # Obter as similaridades entre o filme clicado e todos os outros filmes
    sim_scores = []
    for i in range(len(movies)):
        sim_score = cosine_similarity([combine_features(idx)], [combine_features(i)])
        sim_scores.append((i, sim_score[0][0]))  # Armazenando o índice e a similaridade
    
    # Ordenar pela similaridade (descendente)
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    
    # Pegar os 8 filmes mais semelhantes (excluindo o próprio filme clicado)
    sim_scores = sim_scores[1:9]
    
    # Obter os índices dos filmes recomendados
    movie_indices = [i[0] for i in sim_scores]
    
    # Retornar os títulos e as imagens dos filmes recomendados
    recommended = []
    for i in movie_indices:
        recommended.append({
            "title": movies['title'].iloc[i],
            "poster_path": movies['poster_path'].iloc[i],
            "movie_id": int(movies['id'].iloc[i])

        })
    
    return recommended




# movie_id_clicked = 945961
# print(movies[movies['id'] == movie_id_clicked])
# recommended_movies = recommend_movies(movie_id=movie_id_clicked)
# print("Filmes recomendados para o filme clicado:")
# print(recommended_movies)
