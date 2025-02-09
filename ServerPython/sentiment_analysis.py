# from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
# from src.db.db_operations import get_reviews_from_db, get_movies_from_db, get_id_from_movies
# from src.db.db_connector import update_fakeImdb

# analyzer = SentimentIntensityAnalyzer()

# # Função para normalizar o rating de [0, 10] para [-1, 1]
# def normalize_rating(rating):
#     return (rating - 5) / 5 if rating is not None else None

# # Função para analisar o sentimento do conteúdo
# def analyze_sentiment(content):
#     sentiment = analyzer.polarity_scores(content)
#     return sentiment['compound'] 

# def get_sentiment_from_review(review):
#     rating = review.get('author_details', {}).get('rating', None)
#     sentiment_from_rating = normalize_rating(rating)
#     sentiment_from_content = analyze_sentiment(review['content'])
#     return sentiment_from_rating, sentiment_from_content

# def get_public_vote(movie_id, movies):
#     if hasattr(movies, 'columns'):
#         movies['id'] = movies['id'].astype(int)
#         if movie_id not in movies['id'].values:
#             raise ValueError(f"ID {movie_id} do filme não encontrado!")
#         movie = movies.loc[movies['id'] == movie_id].iloc[0]
    
#     elif isinstance(movies, dict):
#         if str(movie_id) not in movies:
#             raise ValueError(f"ID {movie_id} do filme não encontrado!")
#         movie = movies[str(movie_id)]
    
#     else:
#         raise TypeError("Formato de 'movies' desconhecido!")

#     return movie['vote_average']

# # Função principal que faz todo o processamento
# def analyze_movie_sentiment(movie_id):
#     reviewsFromTMDB = get_reviews_from_db()
#     movies = get_movies_from_db()

#     # Filtrando as reviews pelo ID do filme
#     reviews_for_movie = [
#         review for _, review in reviewsFromTMDB.iterrows() if review['movie_id'] == movie_id
#     ]

#     # Aplicando o cálculo do sentimento baseado no rating e no conteúdo
#     rating_sentiments = []
#     content_sentiments = []

#     for review in reviews_for_movie:
#         rating_sentiment, content_sentiment = get_sentiment_from_review(review)
#         rating_sentiments.append(rating_sentiment)
#         content_sentiments.append(content_sentiment)

#     # Calculando a média dos sentimentos (ignorando None)
#     rating_sentiments_filtered = [s for s in rating_sentiments if s is not None]
#     content_sentiments_filtered = [s for s in content_sentiments if s is not None]

#     average_rating_sentiment = sum(rating_sentiments_filtered) / len(rating_sentiments_filtered) if rating_sentiments_filtered else 0
#     average_content_sentiment = sum(content_sentiments_filtered) / len(content_sentiments_filtered) if content_sentiments_filtered else 0

#     # Convertendo para a escala de 0 a 10
#     final_rating_score = (average_rating_sentiment + 1) * 5
#     final_content_score = (average_content_sentiment + 1) * 5

#     # Média combinada (50% rating, 50% conteúdo)
#     final_combined_score = (final_rating_score + final_content_score) / 2

#     try:
#         vote_average = get_public_vote(movie_id, movies)
#     except Exception as e:
#         print(f"Erro ao obter nota pública: {e}")
#         vote_average = None

#     # Calculando a nota final (50% pública, 50% sentimento)
#     if vote_average is not None:
#         fakeImdb = (vote_average + final_combined_score) / 2
#     else:
#         fakeImdb = final_combined_score 

#     return {
#         "fakeImdb": fakeImdb,  # Ajustado para corresponder ao nome esperado
#         "final_rating_score": final_rating_score,
#         "final_content_score": final_content_score,
#         "final_combined_score": final_combined_score,
#         "vote_average": vote_average
#     }

# # Função para processar todos os filmes e salvar o fakeImdb no banco
# def generate_fakeImdb_movies(): 
#     movie_ids = get_id_from_movies()

#     for movie_id in movie_ids:
#         try:
#             result = analyze_movie_sentiment(movie_id)
#             fakeImdb = result["fakeImdb"]
#             update_fakeImdb(movie_id, fakeImdb)

#             print(f"Processado filme {movie_id}: fakeImdb = {fakeImdb}")

#         except Exception as e:
#             print(f"Erro ao processar filme {movie_id}: {e}")

# if __name__ == "__main__":
#     generate_fakeImdb_movies()

