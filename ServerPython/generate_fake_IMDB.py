from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from src.db.db_operations import get_reviews_from_db, get_movies_from_db, get_id_from_movies
from src.db.db_connector import update_fakeImdb

analyzer = SentimentIntensityAnalyzer()

# Função para normalizar o rating de [0, 10] para [-1, 1]
def normalize_rating(rating):
    return (rating - 5) / 5 if rating is not None else None

# Função para analisar o sentimento do conteúdo
def analyze_sentiment(content):
    sentiment = analyzer.polarity_scores(content)
    return sentiment['compound'] 

def get_sentiment_from_review(review):
    rating = review.get('author_details', {}).get('rating', None)
    sentiment_from_rating = normalize_rating(rating)
    sentiment_from_content = analyze_sentiment(review['content'])
    return sentiment_from_rating, sentiment_from_content

def get_public_vote(movie_id, movies):
    if hasattr(movies, 'columns'):
        movies['id'] = movies['id'].astype(int)
        if movie_id not in movies['id'].values:
            raise ValueError(f"ID {movie_id} do filme não encontrado!")
        movie = movies.loc[movies['id'] == movie_id].iloc[0]
    
    elif isinstance(movies, dict):
        if str(movie_id) not in movies:
            raise ValueError(f"ID {movie_id} do filme não encontrado!")
        movie = movies[str(movie_id)]
    
    else:
        raise TypeError("Formato de 'movies' desconhecido!")

    return movie['vote_average']


def analyze_movie_sentiment(movie_id):
    reviewsFromTMDB = get_reviews_from_db()
    movies = get_movies_from_db()


    reviews_for_movie = [
        review for _, review in reviewsFromTMDB.iterrows() if review['movie_id'] == movie_id
    ]


    rating_sentiments = []
    content_sentiments = []

    for review in reviews_for_movie:
        rating_sentiment, content_sentiment = get_sentiment_from_review(review)
        rating_sentiments.append(rating_sentiment)
        content_sentiments.append(content_sentiment)

    rating_sentiments_filtered = [s for s in rating_sentiments if s is not None]
    content_sentiments_filtered = [s for s in content_sentiments if s is not None]

    average_rating_sentiment = sum(rating_sentiments_filtered) / len(rating_sentiments_filtered) if rating_sentiments_filtered else 0
    average_content_sentiment = sum(content_sentiments_filtered) / len(content_sentiments_filtered) if content_sentiments_filtered else 0


    final_rating_score = (average_rating_sentiment + 1) * 5
    final_content_score = (average_content_sentiment + 1) * 5

   
    final_combined_score = (final_rating_score + final_content_score) / 2

    try:
        vote_average = get_public_vote(movie_id, movies)
    except Exception as e:
        print(f"Erro ao obter nota pública: {e}")
        vote_average = None

    if vote_average is not None:
        fakeImdb = (vote_average + final_combined_score) / 2
    else:
        fakeImdb = final_combined_score 

    return {
        "fakeImdb": fakeImdb,  
        "final_rating_score": final_rating_score,
        "final_content_score": final_content_score,
        "final_combined_score": final_combined_score,
        "vote_average": vote_average
    }


def generate_fakeImdb_movies(): 
    movie_ids = get_id_from_movies()

    for movie_id in movie_ids:
        try:
            result = analyze_movie_sentiment(movie_id)
            fakeImdb = result["fakeImdb"]
            update_fakeImdb(movie_id, fakeImdb)

            print(f"Processado filme {movie_id}: fakeImdb = {fakeImdb}")

        except Exception as e:
            print(f"Erro ao processar filme {movie_id}: {e}")

if __name__ == "__main__":
    generate_fakeImdb_movies()













# import numpy as np
# from src.db.db_operations import get_movies_from_db
# from src.utility.embedding_utils import genre_mapping
# from sentence_transformers import util
# from src.utility.embedding_utils import model

# def find_similar_movies(user_input, movie_embeddings, movies, top_n=3):
#     """Encontra os filmes mais similares usando similaridade de cosseno."""
#     input_embedding = model.encode(user_input, convert_to_tensor=True)
#     similarities = util.pytorch_cos_sim(input_embedding, movie_embeddings)
#     sorted_indices = np.argsort(-similarities.numpy())[0]  # Ordena em ordem decrescente

#     results = []
#     for i in range(top_n):
#         idx = sorted_indices[i]
        
   
#         movie = movies[idx]


#         genre_ids = movie.get('genre_ids', [])
        
    
#         genre_names = [genre_mapping.get(genre_id, "Unknown") for genre_id in genre_ids]
        
     
#         results.append({
#             "title": movie['title'],
#             "genres": genre_names,
#             "overview": movie['overview']
#         })
    
#     return results
 
