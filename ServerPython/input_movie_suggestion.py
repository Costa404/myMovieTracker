
# from nltk.corpus import wordnet as wn
# from fuzzywuzzy import process  
# from src.db.db_operations import get_movies_from_db
# from src.utility.embedding_utils import genre_mapping, model
# from src.utility.embedding_utils import get_movie_embeddings
# from sentence_transformers import util
# import numpy as np


# movies = get_movies_from_db()
# movie_embeddings, movies = get_movie_embeddings(movies)

# def get_synonyms(word, limit=5):

#     synonyms = set()
#     for syn in wn.synsets(word):
#         for lemma in syn.lemmas():
#             synonyms.add(lemma.name().lower())  
#             if len(synonyms) >= limit:  
#                 return synonyms  
#     return synonyms

# def extract_genre_or_movie(user_input, movies, available_genres):
    
#     words = user_input.lower().split()

#     for word in words:
#         if word in available_genres:
#             return word  

#     for word in words:
#         synonyms = get_synonyms(word)
#         for genre in available_genres:
#             if genre.lower() in synonyms:
#                 return genre  
  
#     input_embedding = model.encode(user_input, convert_to_tensor=True)
#     similarities = util.pytorch_cos_sim(input_embedding, movie_embeddings)
#     best_match_idx = similarities.argmax().item()

  
#     return movies.iloc[best_match_idx]['title']

# def find_similar_movies(genre, movie_embeddings, movies, top_n=3):
  
#     input_embedding = model.encode(genre, convert_to_tensor=True)
#     similarities = util.pytorch_cos_sim(input_embedding, movie_embeddings)
#     sorted_indices = np.argsort(-similarities.numpy())[0] 

#     results = []
#     for i in range(top_n):
#         idx = sorted_indices[i]
#         movie = movies.iloc[idx]  
#         genre_names = [genre_mapping.get(g, "Unknown") for g in movie.get('genre_ids', [])]

#         results.append({
#             "title": movie['title'],
#             "genres": genre_names,
#             "overview": movie['overview']
#         })
    
#     return results
# def handle_user_input():
#     print("Hi! What do you want to watch today? (yes/no)")

#     user_input = input().strip().lower()

#     # Respostas positivas e negativas
#     positive_responses = ["yes", "y", "sure", "ok", "sim", "claro", "pode ser"]
#     negative_responses = ["no", "n", "nah", "não", "nope"]

#     if user_input in positive_responses:
#         # Se resposta for positiva, perguntar o gênero
#         genre = input("What genre do you like? ").strip().lower()

#         # Aqui chamamos a função que busca filmes desse gênero
#         available_genres = list(genre_mapping.values())
#         detected_genre = extract_genre_or_movie(genre, movies, available_genres)

#         if detected_genre:
#             print(f"Detected genre: {detected_genre}")

#             # Buscar filmes recomendados
#             similar_movies = find_similar_movies(detected_genre, movie_embeddings, movies)
#             response = "\n".join([f"Title: {movie['title']}\nGenres: {', '.join(movie['genres'])}\nOverview: {movie['overview']}\n"
#                                   for movie in similar_movies])
#             print(response)
#         else:
#             print("Sorry, I couldn't find that genre. Try another one!")

#     elif user_input in negative_responses:
#         # Se resposta for negativa, perguntar se quer tempo ou sugestões
#         follow_up = input("Do you want to think a little more or would you like to see some suggestions? (think/suggestions) ").strip().lower()

#         if follow_up == "suggestions":
#             print("I'll show you some movies!")

#             # Gerar sugestões aleatórias de filmes sem gênero específico
#             random_movies = find_similar_movies(None, movie_embeddings, movies, top_n=5)  
#             response = "\n".join([f"Title: {movie['title']}\nGenres: {', '.join(movie['genres'])}\nOverview: {movie['overview']}\n"
#                                   for movie in random_movies])
#             print(response)
#         else:
#             print("No problem! Take your time to decide.")
    
#     else:
#         # Resposta inesperada ou irreconhecível
#         print("I didn't quite understand that. Can you just answer with 'yes' or 'no'?")

# handle_user_input()
