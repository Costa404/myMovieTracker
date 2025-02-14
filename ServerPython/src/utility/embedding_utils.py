from sentence_transformers import SentenceTransformer

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


model = SentenceTransformer('all-MiniLM-L6-v2')
# def get_movie_embeddings(movies):
#     # Verifique o tipo e conteúdo de `movies`
#     print(type(movies))  # Verifique o tipo de `movies`
#     print(movies)        # Verifique o conteúdo de `movies`

#     movie_descriptions = [
#         f"{movie['title']} - {', '.join([genre_mapping.get(genre_id, 'Unknown') for genre_id in movie.get('genre_ids', [])])}: {movie.get('overview', 'No description available.')}"
#         for movie in movies
#     ]
    
#     return model.encode(movie_descriptions, convert_to_tensor=True), movies  # Retorna também os filmes
def get_movie_embeddings(movies):

    movie_descriptions = [
        f"{movie['title']} - {', '.join([genre_mapping.get(genre_id, 'Unknown') for genre_id in movie['genre_ids']])}: {movie.get('overview', 'No description available.')}"
        for _, movie in movies.iterrows()  # a usar iterrows() para iterar sobre o DataFrame
    ]
    return model.encode(movie_descriptions, convert_to_tensor=True), movies
