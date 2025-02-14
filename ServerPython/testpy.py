# # from src.db.db_operations import list_tables
# from src.db.db_operations import get_movies_from_db
# import pandas as pd
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity

# # list_tables()
# get_movies_from_db()

# movies = get_movies_from_db()

# # Supondo que você já tem o DataFrame 'movies' com as informações dos filmes
# # Exemplo: movies = get_movies_from_db()

# # Pré-processamento - preenchendo valores ausentes
# movies['overview'] = movies['overview'].fillna('')

# # Vetorização do texto com TF-IDF (para o 'overview')
# tfidf_vectorizer = TfidfVectorizer(stop_words='english')
# tfidf_matrix = tfidf_vectorizer.fit_transform(movies['overview'])

# # Cálculo da similaridade entre os filmes usando cosine similarity
# cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

# # Função para recomendar filmes baseado no filme clicado
# def recommend_movies(movie_id, cosine_sim=cosine_sim):
#     # Encontrar o índice do filme baseado no ID
#     idx = movies.index[movies['id'] == movie_id].tolist()[0]  # Índice do filme clicado

#     # Obter as similaridades de todos os filmes em relação ao filme clicado
#     sim_scores = list(enumerate(cosine_sim[idx]))  # Similaridade entre o filme clicado e todos os outros
#     sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)  # Ordenar pela similaridade
#     sim_scores = sim_scores[1:11]  # Pegar os 10 filmes mais semelhantes (excluindo o próprio filme clicado)
    
#     # Obter os índices dos filmes recomendados
#     movie_indices = [i[0] for i in sim_scores]

#     # Retornar os títulos dos filmes recomendados
#     return movies['title'].iloc[movie_indices]

# # Teste: Supondo que o usuário clicou no filme com ID = 1
# movie_id_clicked = 539972
# recommended_movies = recommend_movies(movie_id=movie_id_clicked)
# print("Filmes recomendados para o filme clicado:")
# print(recommended_movies)
def update_fakeImdb(movie_id, fakeImdb):
    # Certifique-se de que fakeImdb é do tipo float
    fakeImdb = float(fakeImdb)  

    # Conectando ao banco de dados
 
    cursor = conn.cursor()

    # Definindo a consulta SQL
    query = """
    UPDATE movies
    SET fakeimdb = %s
    WHERE id = %s;
    """

    # Executando a consulta com os valores
    cursor.execute(query, (fakeImdb, movie_id))

    # Comitando as mudanças e fechando a conexão
    conn.commit()
    cursor.close()
    conn.close()



import psycopg2
import pandas as pd
import matplotlib.pyplot as plt
from src.db.db_connector import get_db_connection

conn = get_db_connection()  
# Consulta SQL
query = """
SELECT 'Initial' AS source, m.date, m.popularity, m.vote_average, m.vote_count
FROM movies m
WHERE m.title = 'Interstellar'

UNION ALL

SELECT 'History' AS source, mh.date, mh.popularity, mh.vote_average, mh.vote_count
FROM movie_history mh
WHERE mh.movie_id = (SELECT movie_id FROM movies WHERE title = 'Interstellar')
ORDER BY date NULLS FIRST;



"""

# Carregar os dados no Pandas
df = pd.read_sql(query, conn)
conn.close()

# Criar o gráfico de área
plt.figure(figsize=(10, 5))
plt.fill_between(df["date"], df["popularity"], color="b", alpha=0.3, label="Popularity Over Time")

# Adicionar ponto inicial de popularidade
plt.scatter(df["date"].iloc[0], df["popularity"].iloc[0], color="r", zorder=3, label="Initial Popularity")

# Personalizar
plt.xlabel("Date")
plt.ylabel("Popularity")
plt.title("Popularity of Interstellar Over Time (Area Plot)")
plt.legend()
plt.xticks(rotation=45)

# Mostrar gráfico
plt.show()
