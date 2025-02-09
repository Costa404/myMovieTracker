# from .db_connector import get_db_connection

# def list_tables():
#     try:
#         conn = get_db_connection()

#         if conn is not None:
#             cur = conn.cursor()
#             cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';")
#             tables = cur.fetchall()

#             print("Tabelas no banco de dados:")
#             for table in tables:
#                 print(table)

#             cur.execute("SELECT version();")
#             db_version = cur.fetchone()
#             print(f"Conectado ao banco de dados: {db_version[0]}")

#             cur.close()
#             conn.close()
#         else:
#             print("Não foi possível conectar ao banco de dados.")
#     except Exception as e:
#         print(f"Erro ao executar o comando SQL: {e}")

            
from sqlalchemy import create_engine
import pandas as pd
import os
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

def get_movies_from_db():
    try:
        engine = create_engine(DATABASE_URL)
        query = "SELECT * FROM movies;"
        movies = pd.read_sql(query, engine)
      
        return movies
    except Exception as e:
        print("Error conecting db", e)
        return pd.DataFrame([])

def get_reviews_from_db():
    try:
        engine = create_engine(DATABASE_URL)
        query = "SELECT * FROM reviews_from_TMDB"

        reviewsFromTMDB = pd.read_sql(query, engine)

        return reviewsFromTMDB 
    except Exception as e:
        print("Error conecting db", e)
        return pd.DataFrame([])
    

def get_id_from_movies():
    movies = get_movies_from_db()
    return movies["id"].tolist()  # Retorna a coluna 'id' como uma lista de IDs
